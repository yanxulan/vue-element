'use strict';

var FStream = require('fs');
var Archiver = require('archiver'); //npm install archiver

/**
 * 版本信息生成插件
 * @author phpdragon@qq.com
 * @param options
 * @constructor
 */
function DiyPlugin(options) {
    this.options = options || {};
    this.options.outZipFile = this.options.path + '/front.zip';

    !this.options.versionDirectory && (this.options.versionDirectory = 'static');
}

//apply方法是必须要有的，因为当我们使用一个插件时（new somePlugins({})），webpack会去寻找插件的apply方法并执行
DiyPlugin.prototype.apply = function (compiler) {
    var self = this;

    compiler.plugin("compile", function (params) {
        var dir_path = this.options.context + '/' + self.options.versionDirectory;
        var version_file = dir_path + '/version.json';
        var content = '{"version":' + self.options.env.VERSION + '}';

        FStream.exists(dir_path, function (exist) {
            if (exist) {
                writeVersion(self, version_file, content);
                return;
            }

            FStream.mkdir(dir_path, function (err) {
                if (err) throw err;
                console.log('\n创建目录[' + dir_path + ']成功');

                writeVersion(self, version_file, content);
            });
        });
    });

    //编译器'对'所有任务已经完成'这个事件的监听
    compiler.plugin("done", function (stats) {
        console.log("开始打包压缩编译文件...");

        var output = FStream.createWriteStream(self.options.outZipFile);
        var archiveZip = Archiver('zip', {zlib: {level: 9}});

        archiveZip.on('error', function (err) {
            throw err;
        });

        archiveZip.pipe(output);
        archiveZip.directory(self.options.path + '/' + self.options.versionDirectory, self.options.versionDirectory);
        archiveZip.file(self.options.path + '/index.html', {name: 'index.html'});
        //archive.glob(self.options.path + '/*.*');
        archiveZip.finalize();
    });
};

const writeVersion = (self, versionFile, content) => {
    console.log("\n当前版本号：" + self.options.env.VERSION);
    console.log("开始写入版本信息...");

    //写入文件
    FStream.writeFile(versionFile, content, function (err) {
        if (err) throw err;
        console.log("版本信息写入成功!");
    });

    //删除之前的压缩包
    FStream.exists(self.options.outZipFile, function (exists) {
        if (exists) {
            FStream.unlinkSync(self.options.outZipFile);
        }
    });
}

module.exports = DiyPlugin;
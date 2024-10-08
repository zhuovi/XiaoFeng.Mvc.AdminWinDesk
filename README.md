# XiaoFeng.Mvc.AdminWinDesk

![fayelf](https://camo.githubusercontent.com/4fb01e4715af3d34835b6872ef93a6b21c5371337d44c410d32e8d7c208e196a/68747470733a2f2f7777772e65656c662e636e2f6c6f676f782e706e67)

![GitHub top language](https://img.shields.io/github/languages/top/zhuovi/XiaoFeng.Mvc.AdminWinDesk?logo=github)
![GitHub License](https://img.shields.io/github/license/zhuovi/XiaoFeng.Mvc.AdminWinDesk?logo=github)
![Nuget Downloads](https://img.shields.io/nuget/dt/XiaoFeng.Mvc.AdminWinDesk?logo=nuget)
![Nuget](https://img.shields.io/nuget/v/XiaoFeng.Mvc.AdminWinDesk?logo=nuget)
![Nuget (with prereleases)](https://img.shields.io/nuget/vpre/XiaoFeng.Mvc.AdminWinDesk?label=dev%20nuget&logo=nuget)

Nuget：XiaoFeng.Mvc.AdminWinDesk

| QQ群号 | QQ群 | 公众号 |
| :----:| :----: | :----: |
| 748408911  | ![QQ 群](https://user-images.githubusercontent.com/16105174/198058269-0ea5928c-a2fc-4049-86da-cca2249229ae.png) | ![畅聊了个科技](https://user-images.githubusercontent.com/16105174/198059698-adbf29c3-60c2-4c76-b894-21793b40cf34.jpg) |

源码： https://github.com/zhuovi/XiaoFeng.Mvc.AdminWinDesk

教程： https://www.eelf.cn

 模仿windows桌面后台皮肤

 ## 感谢支持
<!--| JetBrains | [![JetBrains](https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg?_ga=2.18748729.1472960975.1710982503-1993260277.1703834590&_gl=1*1o75dn2*_ga*MTk5MzI2MDI3Ny4xNzAzODM0NTkw*_ga_9J976DJZ68*MTcxMDk4MjUwMi43LjEuMTcxMDk4NDUwOC4zOC4wLjA.)](https://jb.gg/OpenSourceSupport) |
| Visual Studio | [![Visual Studio](https://visualstudio.microsoft.com/wp-content/uploads/2021/10/Product-Icon.svg)](https://visualstudio.microsoft.com/) |-->
| 名称 | LOGO |
| :----:| :----: |
| JetBrains | [![JetBrains](https://camo.githubusercontent.com/8dc9898d621b099ba0baef38e2255dc4a101a5fb0af5e10c7ee8f6104b2b4ad4/68747470733a2f2f7265736f75726365732e6a6574627261696e732e636f6d2f73746f726167652f70726f64756374732f636f6d70616e792f6272616e642f6c6f676f732f6a625f6265616d2e7376673f5f67613d322e31383734383732392e313437323936303937352e313731303938323530332d313939333236303237372e31373033383334353930265f676c3d312a316f3735646e322a5f67612a4d546b354d7a49324d4449334e7934784e7a417a4f444d304e546b772a5f67615f394a393736444a5a36382a4d5463784d446b344d6a55774d6934334c6a45754d5463784d446b344e4455774f43347a4f4334774c6a412e)](https://jb.gg/OpenSourceSupport) |
| Visual Studio | [![Visual Studio](https://camo.githubusercontent.com/062bd93be4d796bb609715f79a861eac611ae9e43cf29e7d652f49b306c16b19/68747470733a2f2f76697375616c73747564696f2e6d6963726f736f66742e636f6d2f77702d636f6e74656e742f75706c6f6164732f323032312f31302f50726f647563742d49636f6e2e737667)](https://visualstudio.microsoft.com/) |

## XiaoFeng
XiaoFeng generator with [XiaoFeng](https://github.com/zhuovi/XiaoFeng).

## XiaoFeng.Mvc.AdminWinDesk
XiaoFeng.Mvc.AdminWinDesk generator with [XiaoFeng.Mvc.AdminWinDesk](https://github.com/zhuovi/XiaoFeng.Mvc.AdminWinDesk).

## Install

.NET CLI

```
$ dotnet add package XiaoFeng.Mvc.AdminWinDesk --version 1.0.4
```

Package Manager

```
PM> Install-Package XiaoFeng.Mvc.AdminWinDesk -Version 1.0.4
```

PackageReference

```
<PackageReference Include="XiaoFeng.Mvc.AdminWinDesk" Version="1.0.4" />
```

Paket CLI

```
> paket add XiaoFeng.Mvc.AdminWinDesk --version 1.0.4
```

Script & Interactive

```
> #r "nuget: XiaoFeng.Mvc.AdminWinDesk, 1.0.4"
```

Cake

```
// Install XiaoFeng.Mvc.AdminWinDesk as a Cake Addin
#addin nuget:?package=XiaoFeng.Mvc.AdminWinDesk&version=1.0.4

// Install XiaoFeng.Mvc.AdminWinDesk as a Cake Tool
#tool nuget:?package=XiaoFeng.Mvc.AdminWinDesk&version=1.0.4
```

# 更新日志

## 2023-08-29 v 1.0.4

1.增加登录接口配置;

2.增加开始菜单logo配置;


## 2023-05-18 v 1.0.3	

1.修复后台路径改变后退出后登录路径不正确，桌面图标网址不正确的bug;

2.弹出窗口增加几个方向的改变窗体大小事件;

# XiaoFeng 类库包含库
| 命名空间 | 所属类库 | 开源状态 | 说明 | 包含功能 |
| :----| :---- | :---- | :----: | :---- |
| XiaoFeng.Prototype | XiaoFeng.Core | :white_check_mark: | 扩展库 | ToCase 类型转换<br/>ToTimestamp,ToTimestamps 时间转时间戳<br/>GetBasePath 获取文件绝对路径,支持Linux,Windows<br/>GetFileName 获取文件名称<br/>GetMatch,GetMatches,GetMatchs,IsMatch,ReplacePatten,RemovePattern 正则表达式操作<br/> |
| XiaoFeng.Net | XiaoFeng.Net | :white_check_mark: | 网络库 | XiaoFeng网络库，封装了Socket客户端，服务端（Socket,WebSocket），根据当前库可轻松实现订阅，发布等功能。|
| XiaoFeng.Http | XiaoFeng.Core | :white_check_mark: | 模拟请求库 | 模拟网络请求 |
| XiaoFeng.Data | XiaoFeng.Core | :white_check_mark: | 数据库操作库 | 支持SQLSERVER,MYSQL,ORACLE,达梦,SQLITE,ACCESS,OLEDB,ODBC等数十种数据库 |
| XiaoFeng.Cache | XiaoFeng.Core | :white_check_mark: | 缓存库 |  内存缓存,Redis,MemcachedCache,MemoryCache,FileCache缓存 |
| XiaoFeng.Config | XiaoFeng.Core | :white_check_mark: | 配置文件库 | 通过创建模型自动生成配置文件，可为xml,json,ini文件格式 |
| XiaoFeng.Cryptography | XiaoFeng.Core | :white_check_mark: | 加密算法库 | AES,DES,RSA,MD5,DES3,SHA,HMAC,RC4加密算法 |
| XiaoFeng.Excel | XiaoFeng.Excel | :white_check_mark: | Excel操作库 | Excel操作，创建excel,编辑excel,读取excel内容，边框，字体，样式等功能  |
| XiaoFeng.Ftp | XiaoFeng.Ftp | :white_check_mark: | FTP请求库 | FTP客户端 |
| XiaoFeng.IO | XiaoFeng.Core | :white_check_mark: | 文件操作库 | 文件读写操作 |
| XiaoFeng.Json | XiaoFeng.Core | :white_check_mark: | Json序列化，反序列化库 | Json序列化，反序列化库 |
| XiaoFeng.Xml | XiaoFeng.Core | :white_check_mark: | Xml序列化，反序列化库 | Xml序列化，反序列化库 |
| XiaoFeng.Log | XiaoFeng.Core | :white_check_mark: | 日志库 | 写日志文件,数据库 |
| XiaoFeng.Memcached | XiaoFeng.Memcached | :white_check_mark: | Memcached缓存库 | Memcached中间件,支持.NET框架、.NET内核和.NET标准库,一种非常方便操作的客户端工具。实现了Set,Add,Replace,PrePend,Append,Cas,Get,Gets,Gat,Gats,Delete,Touch,Stats,Stats Items,Stats Slabs,Stats Sizes,Flush_All,Increment,Decrement,线程池功能。|
| XiaoFeng.Redis | XiaoFeng.Redis | :white_check_mark: | Redis缓存库 | Redis中间件,支持.NET框架、.NET内核和.NET标准库,一种非常方便操作的客户端工具。实现了Hash,Key,String,ZSet,Stream,Log,List,订阅发布,线程池功能; |
| XiaoFeng.Threading | XiaoFeng.Core | :white_check_mark: | 线程库 | 线程任务,线程队列 |
| XiaoFeng.Mvc | XiaoFeng.Mvc | :x: | 低代码WEB开发框架 | .net core 基础类，快速开发CMS框架，真正的低代码平台，自带角色权限，WebAPI平台，后台管理，可托管到服务运行命令为:应用.exe install 服务名 服务说明,命令还有 delete 删除 start 启动  stop 停止。 |
| XiaoFeng.Proxy | XiaoFeng.Proxy | :white_check_mark: | 代理库 | 开发中 |
| XiaoFeng.TDengine | XiaoFeng.TDengine | :white_check_mark: | TDengine 客户端 | 开发中 |
| XiaoFeng.GB28181 | XiaoFeng.GB28181 | :white_check_mark: | 视频监控库，SIP类库，GB28181协议 | 开发中 |
| XiaoFeng.Onvif | XiaoFeng.Onvif | :white_check_mark: | 视频监控库Onvif协议 | XiaoFeng.Onvif 基于.NET平台使用C#封装Onvif常用接口、设备、媒体、云台等功能， 拒绝WCF服务引用动态代理生成wsdl类文件 ， 使用原生XML扩展标记语言封装参数，所有的数据流向都可控。 |


### 使用说明

1.通过 Microsoft Visual Studio Enterprise 2022 新建空项目

2.从Nuget上搜索 XiaoFeng.Mvc.AdminWinDesk,然后安装 System.Data.SQLite 这是默认的SQLite驱动

3.把项目下的 appsetting.json文件删除

4.把Program.cs文件修改为如下:
``` csharp
using XiaoFeng.Mvc.AdminWinDesk;

await ApplicationManager.Load(args).RunAsync(() => WebHost.CreateHost(args, services =>
{
#if DEBUG
	//services.AddControllersWithViews().AddRazorRuntimeCompilation();
#endif
}, app =>
{
    //启用 windows desk 皮肤
	app.UseAdminWinDesk(app.Environment);

},init:true));
```
5.启动项目

6.启动起来后，输入网址 http://localhost:8001/Admin

7.输入帐号 admin 密码admin123456

8.进入后台界面。
![image](https://user-images.githubusercontent.com/40175292/217198431-d4dad50b-eee6-43f3-8b67-27fd0cfaea6d.png)

9.首界面
![image](https://user-images.githubusercontent.com/40175292/217198615-7e4ac224-3c7c-4239-8016-af2af3006384.png)

10.编辑界面
![image](https://user-images.githubusercontent.com/40175292/217198894-5c66aca3-06f3-4461-a519-6ebe8419fe1f.png)

11.修改密码
![image](https://user-images.githubusercontent.com/40175292/217199117-521f8ec4-21aa-4403-8dbb-a8d9ea28ee58.png)

12.权限桌面
![a5a4bbbf6b7613d7208dd682154063a](https://user-images.githubusercontent.com/40175292/217200652-89bb51fc-99bc-415b-95b4-fe7aa57eff72.png)

13.win桌面
![f6b1b0d12bdcb50bdb551e9fe750f0e](https://user-images.githubusercontent.com/40175292/217200719-4822bce1-798c-4e8b-a12c-ae810847cdd7.png)


# 作者介绍



* 网址 : https://www.eelf.cn
* QQ : 7092734
* Email : jacky@eelf.cn


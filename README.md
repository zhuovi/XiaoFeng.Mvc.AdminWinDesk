# XiaoFeng.Mvc.AdminWinDesk

 ![fayelf](https://user-images.githubusercontent.com/16105174/197918392-29d40971-a8a2-4be4-ac17-323f1d0bed82.png)

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

教程： https://www.yuque.com/fayelf/xiaofeng.mvc

 模仿windows桌面后台皮肤

## XiaoFeng

XiaoFeng generator with [XiaoFeng](https://github.com/zhuovi/XiaoFeng).

## Install

.NET CLI

```
$ dotnet add package XiaoFeng.Mvc.AdminWinDesk --version 1.0.0
```

Package Manager

```
PM> Install-Package XiaoFeng.Mvc.AdminWinDesk -Version 1.0.0
```

PackageReference

```
<PackageReference Include="XiaoFeng.Mvc.AdminWinDesk" Version="1.0.0" />
```

Paket CLI

```
> paket add XiaoFeng.Mvc.AdminWinDesk --version 1.0.0
```

Script & Interactive

```
> #r "nuget: XiaoFeng.Mvc.AdminWinDesk, 1.0.0"
```

Cake

```
// Install XiaoFeng.Mvc.AdminWinDesk as a Cake Addin
#addin nuget:?package=XiaoFeng.Mvc.AdminWinDesk&version=1.0.0

// Install XiaoFeng.Mvc.AdminWinDesk as a Cake Tool
#tool nuget:?package=XiaoFeng.Mvc.AdminWinDesk&version=1.0.0
```

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



* 网址 : http://www.fayelf.com
* QQ : 7092734
* EMail : jacky@fayelf.com


using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using XiaoFeng;

/****************************************************************
*  Copyright © (2023) www.fayelf.com All Rights Reserved.       *
*  Author : jacky                                               *
*  QQ : 7092734                                                 *
*  Email : jacky@fayelf.com                                     *
*  Site : www.fayelf.com                                        *
*  Create Time : 2023-01-12 15:07:47                            *
*  Version : v 1.0.0                                            *
*  CLR Version : 4.0.30319.42000                                *
*****************************************************************/
namespace XiaoFeng.Mvc.AdminWinDesk
{
    /// <summary>
    /// 用于将中间件添加到HTTP请求管道的扩展方法。
    /// </summary>
    public static class AdminWinDeskExtensions
    {
        /// <summary>
        /// 扩展应用 启用当前皮肤
        /// </summary>
        /// <param name="app">应用</param>
        /// <param name="env">HOST</param>
        public static void UseAdminWinDesk(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            // 独立静态文件设置，Mvc自己的静态资源内嵌在程序集里面
            var options = new StaticFileOptions();

            var provider = new MvcEmbeddedFileProvider(Assembly.GetExecutingAssembly(), "XiaoFeng.Mvc.AdminWinDesk.wwwroot");
            //if (env.WebRootPath.IsNotNullOrEmpty() && Directory.Exists(env.WebRootPath))
               // options.FileProvider = new CompositeFileProvider(new PhysicalFileProvider(env.WebRootPath), provider);
            //else
                options.FileProvider = provider;
            options.HttpsCompression = Microsoft.AspNetCore.Http.Features.HttpsCompressionMode.Compress;
            app.UseStaticFiles(options);
            System.Collections.Concurrent.ConcurrentBag<XiaoFeng.Net.IServerSession> list;
            var server = new XiaoFeng.Net.NetServer<XiaoFeng.Net.ServerSession>();
            var lsit = server.ConnectionSocketList;
            server.RemoveQueue
           var theme = app.ApplicationServices.GetService<IThemeService>();
            theme.Add("AdminWinDesk", "后台windows桌面皮肤", "仿windows桌面皮肤", Assembly.GetExecutingAssembly());
			/*
             * 数据库初始化
             */
			var data = XiaoFeng.Config.DataBase.Current;
            if (!data.Data.ContainsKey("XiaoFeng.Mvc.AdminWinDeskTop"))
            {
                
            }
        }
    }
}
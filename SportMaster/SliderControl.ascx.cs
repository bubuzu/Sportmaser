using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SportMaster
{
    public partial class SliderControl : System.Web.UI.UserControl
    {
        private string itemBgText = @"<li><div style=""width:160px;height:160px;background-image: url(Images/bg/{0}.jpg); cursor: pointer;"" onclick=""SelectImage('bg',{0});"">{0}</div></li>";
        private string itemHeadText = @"<li><div style=""width:160px;height:160px;background-image: url(Images/head/{0}s.jpg); cursor: pointer;"" onclick=""SelectImage('head',{0});"">{0}</div></li>";
        private string itemEyeText = @"<li><div style=""width:160px;height:160px;background-image: url(Images/eye/{0}s.jpg); cursor: pointer;"" onclick=""SelectImage('eye',{0});"">{0}</div></li>";

        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

        public void Fill(string tp)
        {
            switch (tp)
            {
                case "bg":
                    {
                        string htmlCode = "";
                        for (int i = 1; i < 6; i++)
                        {
                            htmlCode += string.Format(itemBgText, i);
                        }

                        itemsAll.InnerHtml = htmlCode;
                        break;
                    }
                case "head":
                    {
                        string htmlCode = "";
                        for (int i = 1; i < 3; i++)
                        {
                            htmlCode += string.Format(itemHeadText, i);
                        }

                        itemsAll.InnerHtml = htmlCode;
                        break;
                    }
                case "eye":
                    {
                        string htmlCode = "";
                        for (int i = 1; i < 3; i++)
                        {
                            htmlCode += string.Format(itemEyeText, i);
                        }

                        itemsAll.InnerHtml = htmlCode;
                        break;
                    }

            }
        }
    }
}
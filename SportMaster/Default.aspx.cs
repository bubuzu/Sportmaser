using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SportMaster
{
    public partial class Default : System.Web.UI.Page
    {
        private string appSecret = System.Configuration.ConfigurationManager.AppSettings["appsecret"];
        public string appId = System.Configuration.ConfigurationManager.AppSettings["appid"];

        public int uid = 0;
        public string fname = "";
        public string lname = "";


        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params.AllKeys.Contains("viewer_id"))
            {
                if (Request.Params["auth_key"] == MD5.md5(appId + "_" + Request.Params["viewer_id"] + "_" + appSecret))
                {

                    uid = int.Parse(Request.Params["viewer_id"]);

                    JavaScriptSerializer j = new JavaScriptSerializer();

                    WebRequest req =
                        WebRequest.Create(string.Format(
                            "https://api.vk.com/method/getProfiles?uids={0}&fields=photo_big", uid));
                    string result = new StreamReader(req.GetResponse().GetResponseStream()).ReadToEnd();

                    Dictionary<string, Object> user = (Dictionary<string, Object>)((Object[])((Dictionary<string, Object>)j.DeserializeObject(result))["response"])[0];

                    foreach (var key in user.Keys)
                    {
                        Session[key] = user[key];
                    }

                    fname = user["first_name"].ToString();
                    lname = user["last_name"].ToString();

                    using (MainDataContext cntx = new MainDataContext())
                    {
                        cntx.spAddUser(uid, "vk", fname, lname);

                        if (Request.Params.AllKeys.Contains("vk_lead_id"))
                        {
                            cntx.spAddOffer(uid.ToString(), Request.Params["vk_sid"], Request.Params["vk_lead_id"],
                                      Request.Params["vk_hash"]);
                        }

                        cntx.spAddStatistic(Convert.ToInt64(uid), "vk", "P_Start");
                    }
                }
            }
        }

        public static class MD5
        {
            public static string md5(string input)
            {
                string strHash = string.Empty;

                foreach (byte b in new MD5CryptoServiceProvider().ComputeHash(Encoding.Default.GetBytes(input)))
                {
                    strHash += b.ToString("X2");
                }
                return strHash.ToLower();
            }

        }
    }
}
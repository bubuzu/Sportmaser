using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;

namespace SportMaster
{
    public class ajax : IHttpHandler, IReadOnlySessionState
    {
        public void ProcessRequest(HttpContext context)
        {
            Page loader = new Page();
            StringBuilder sr = new StringBuilder();
            TextWriter wr = new StringWriter(sr);
            HtmlTextWriter hwr = new HtmlTextWriter(wr);

            if (context.Request.Params["m"] != null)
            {
                switch (context.Request.Params["m"])
                {
                    case "Shared":
                        {
                            using (MainDataContext cntx = new MainDataContext())
                            {
                                cntx.spSharePost(Convert.ToInt64(context.Request.Params["uid"]), "vk",
                                                 context.Request.Params["pic"],
                                                 Convert.ToInt64(context.Request.Params["fid"]));

                                var offer = cntx.Offers.FirstOrDefault(x => x.vk_uid == context.Request.Params["uid"]);
                                if (offer != null)
                                {
                                    SendOffer(offer.vk_sid, offer.vk_lead_id, offer.vk_uid, offer.vk_hash);
                                }
                            }



                            break;
                        }
                    case "sendFriend":
                        {
                            loader.LoadControl("Friends.ascx").RenderControl(hwr);
                            context.Response.Write(sr.ToString());
                            sr.Clear();
                            break;
                        }
                    case "LoadSlider":
                        {
                            SliderControl slider = (SliderControl)loader.LoadControl("SliderControl.ascx");
                            slider.Fill(context.Request.Params["tp"]);
                            slider.RenderControl(hwr);
                            context.Response.Write(sr.ToString());
                            sr.Clear();
                            break;
                        }

                    case "UploadToVK":
                        {
                            context.Response.Write(UploadImageToVK(context.Request.Params["uploadurl"],
                                                                   context.Request.Params["imageid"],
                                                                   context));
                            break;
                        }
                }
            }
        }

        void SendOffer(string vk_sid, string vk_lead_id, string vk_uid, string vk_hash)
        {
            WebRequest req =
                WebRequest.Create(string.Format(
                    "https://api.vk.com/method/leads.complete?vk_sid={0}&vk_lead_id={1}&vk_uid={2}&vk_hash={3}&secret={4}", vk_sid, vk_lead_id, vk_uid, vk_hash, "BIolT7t6OzhR7bvGoU"));
            string result = new StreamReader(req.GetResponse().GetResponseStream()).ReadToEnd();
        }

        string UploadImageToVK(string path, string imageid, HttpContext context)
        {
            try
            {
                string boundary = "----------" + DateTime.Now.Ticks.ToString("x");

                HttpWebRequest myReq = (HttpWebRequest)HttpWebRequest.Create(path);
                myReq.Method = "POST";

                myReq.ContentType = String.Format("multipart/form-data; boundary={0}", boundary);
                Stream myReqStream = myReq.GetRequestStream();
                string header = String.Format("\r\n--{0}\r\nContent-Disposition: form-data; name=\"{1}\"\r\n\r\n", boundary, "format");
                byte[] h = System.Text.Encoding.UTF8.GetBytes(header);
                myReqStream.Write(h, 0, h.Length);
                byte[] b = System.Text.Encoding.UTF8.GetBytes("xml");
                myReqStream.Write(b, 0, b.Length);

                header = String.Format("\r\n--{0}\r\nContent-Disposition: form-data; name=\"{1}\"; filename=\"{2}\"\r\nContent-Type: {3}\r\n\r\n", boundary, "photo", "image.jpg", "image/jpeg");
                h = System.Text.Encoding.UTF8.GetBytes(header);
                myReqStream.Write(h, 0, h.Length);

                //System.Configuration.ConfigurationManager.AppSettings["appid"]
                //using (BinaryReader myReader = new BinaryReader(new StreamReader(context.Server.MapPath("Genegated/" + imageid)).BaseStream))
                using (BinaryReader myReader = new BinaryReader(new StreamReader(ConfigurationManager.AppSettings["ImagesPath"] + imageid).BaseStream))
                {
                    byte[] buffer = myReader.ReadBytes(2048);
                    while (buffer.Length > 0)
                    {
                        myReq.GetRequestStream().Write(buffer, 0, buffer.Length);
                        buffer = myReader.ReadBytes(2048);
                    }
                }

                myReqStream = myReq.GetRequestStream();
                string footer = String.Format("\r\n--{0}--\r\n", boundary);
                byte[] f = System.Text.Encoding.UTF8.GetBytes(footer);
                myReqStream.Write(f, 0, f.Length);

                HttpWebResponse myResp = (HttpWebResponse)myReq.GetResponse();
                StreamReader myStream = new StreamReader(myResp.GetResponseStream(), System.Text.Encoding.UTF8);

                return myStream.ReadToEnd();
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
            

        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Text;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SportMaster
{
    public partial class Finish : System.Web.UI.Page
    {
        private string head = "";
        private string hair = "";
        private string eye = "";
        private string brow = "";
        private string beard = "";
        private string glass = "";

        private string sport = "";

        private string name = "";

        public string uid = "0";
        

        public string geteratedImage = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params.AllKeys.Contains("head"))
            {
                head = Request.Params["head"];
                hair = Request.Params["hair"];
                eye = Request.Params["eye"];
                brow = Request.Params["brow"];
                beard = Request.Params["beard"];
                glass = Request.Params["glass"];

                sport = Request.Params["sport"];

                name = Request.Params["name"];

                uid = Request.Params["uid"];



                string id = Guid.NewGuid().ToString();

                GenerateImage(id);

                geteratedImage = id + ".jpg";

                using (MainDataContext cntx = new MainDataContext())
                {
                    cntx.spAddPost(Convert.ToInt64(uid), "vk", geteratedImage, "", "");
                    cntx.spAddStatistic(Convert.ToInt64(uid), "vk", "P_Finish");
                    cntx.spAddStatistic(Convert.ToInt64(uid), "vk", "BG_" + sport);
                }
            }
        }

        private void GenerateImage(string id)
        {
            int w = 289;
            int h = 425;

            Bitmap im = new Bitmap(w, h);
            Graphics g = Graphics.FromImage(im);

            if (!string.IsNullOrEmpty(head))
            {
                g.DrawImage(System.Drawing.Image.FromFile(Server.MapPath("Images/constructor/final/head/" + head)), 0, 0, w, h);
            }

            if (!string.IsNullOrEmpty(beard))
            {
                g.DrawImage(System.Drawing.Image.FromFile(Server.MapPath("Images/constructor/final/beard/" + beard)), 0, 0, w, h);
            }

            if (!string.IsNullOrEmpty(brow))
            {
                g.DrawImage(System.Drawing.Image.FromFile(Server.MapPath("Images/constructor/final/brow/" + brow)), 0, 0, w, h);
            }

            if (!string.IsNullOrEmpty(eye))
            {
                g.DrawImage(System.Drawing.Image.FromFile(Server.MapPath("Images/constructor/final/eye/" + eye)), 0, 0, w, h);
            }

            if (!string.IsNullOrEmpty(hair))
            {
                g.DrawImage(System.Drawing.Image.FromFile(Server.MapPath("Images/constructor/final/hair/" + hair)), 0, 0, w, h);
            }

            if (!string.IsNullOrEmpty(glass))
            {
                g.DrawImage(System.Drawing.Image.FromFile(Server.MapPath("Images/constructor/final/glass/" + glass)), 0, 0, w, h);
            }

            Bitmap im2 = new Bitmap(600, 400);
            Graphics g2 = Graphics.FromImage(im2);

            g2.DrawImage(System.Drawing.Image.FromFile(Server.MapPath("Images/final/" + sport + ".png")), 0, 0, 600, 400);


            switch (Convert.ToInt32(sport))
            {
                case 1:
                    {
                        g2.DrawImage(new Bitmap(im, new Size(127, 163)), 235, 60);
                        break;
                    }
                case 2:
                    {
                        g2.DrawImage(new Bitmap(im, new Size(127, 163)), 204, 33);
                        break;
                    }
                case 3:
                    {
                        g2.DrawImage(new Bitmap(im, new Size(127, 163)), 232, 48);
                        break;
                    }
                case 4:
                    {
                        g2.DrawImage(new Bitmap(im, new Size(127, 163)), 235, 58);
                        break;
                    }
                case 5:
                    {
                        g2.DrawImage(new Bitmap(im, new Size(127, 163)), 216, 38);
                        break;
                    }
                case 6:
                    {
                        g2.DrawImage(new Bitmap(im, new Size(127, 163)), 236, 31);
                        break;
                    }
                case 7:
                    {
                        g2.DrawImage(new Bitmap(im, new Size(127, 163)), 311, 43);
                        break;
                    }
                case 8:
                    {
                        g2.DrawImage(new Bitmap(im, new Size(127, 163)), 234, 65);
                        break;
                    }
            }

            //var foo = new PrivateFontCollection();
            //// Provide the path to the font on the filesystem
            //foo.AddFontFile(ConfigurationManager.AppSettings["FontPath"] + "CoHeadlineCorp.ttf");

            //var myCustomFont = new Font((FontFamily)foo.Families[0], 36f);

            StringFormat sf = new StringFormat();
            sf.LineAlignment = StringAlignment.Center;
            sf.Alignment = StringAlignment.Center;

            int fontSize = 19;

            //Name
            g2.DrawString(name.ToUpper() + " - НАСТОЯЩИЙ ЗАЩИТНИК!", new Font("Arial", fontSize, FontStyle.Bold), new SolidBrush(Color.White), new RectangleF(9, 10, 579, 30), sf);
            g2.DrawString(name.ToUpper() + " - НАСТОЯЩИЙ ЗАЩИТНИК!", new Font("Arial", fontSize, FontStyle.Bold), new SolidBrush(Color.White), new RectangleF(11, 10, 581, 30), sf);

            g2.DrawString(name.ToUpper() + " - НАСТОЯЩИЙ ЗАЩИТНИК!", new Font("Arial", fontSize, FontStyle.Bold), new SolidBrush(Color.White), new RectangleF(10, 9, 580, 29), sf);
            g2.DrawString(name.ToUpper() + " - НАСТОЯЩИЙ ЗАЩИТНИК!", new Font("Arial", fontSize, FontStyle.Bold), new SolidBrush(Color.White), new RectangleF(10, 11, 580, 31), sf);

            g2.DrawString(name.ToUpper() + " - НАСТОЯЩИЙ ЗАЩИТНИК!", new Font("Arial", fontSize, FontStyle.Bold), new SolidBrush(Color.Red), new RectangleF(10, 10, 580, 30), sf);

            SaveJPG100(im2, ConfigurationManager.AppSettings["ImagesPath"] + id + ".jpg");
        }

        private void SaveJPG100(Bitmap bmp, string filename)
        {
            EncoderParameters encoderParameters = new EncoderParameters(1);
            encoderParameters.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 90L);
            bmp.Save(filename, GetEncoder(ImageFormat.Jpeg), encoderParameters);
        }

        private void SavePng(Bitmap bmp, string filename)
        {
            EncoderParameters encoderParameters = new EncoderParameters(1);
            encoderParameters.Param[0] = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 90L);
            bmp.Save(filename, GetEncoder(ImageFormat.Png), encoderParameters);
        }

        private ImageCodecInfo GetEncoder(ImageFormat format)
        {
            ImageCodecInfo[] codecs = ImageCodecInfo.GetImageDecoders();
            foreach (ImageCodecInfo codec in codecs)
            {
                if (codec.FormatID == format.Guid)
                {
                    return codec;
                }
            }
            return null;
        }
    }
}
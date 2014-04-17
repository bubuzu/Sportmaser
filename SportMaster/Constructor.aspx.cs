using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SportMaster
{
    public partial class Constructor : System.Web.UI.Page
    {
        public string uid = "0";

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.Params.AllKeys.Contains("uid"))
            {
                uid = Request.Params["uid"];

                using (MainDataContext cntx = new MainDataContext())
                {
                    cntx.spAddStatistic(Convert.ToInt64(uid), "vk", "P_Consctuctor");
                }
            }

        }
    }
}
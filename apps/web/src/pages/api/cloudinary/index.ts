import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "@/lib/cloudinary";
import { allowCors } from "@/lib/middleware";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb", // Set desired value here
    },
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const response = await cloudinary.v2.uploader.upload(
        // base64 image
        JSON.parse(req.body).screenshot,
        {
          resource_type: "auto",
          folder: `screenshots`,
        },
        function (error, result) {}
      );
      return res.json(response);
    } else {
      return (
        res
          .status(405)
          // FIXME: if replacing with .end, ts allowCors error
          .json({ message: `Method ${req.method} Not Allowed` })
      );
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default allowCors(handler);

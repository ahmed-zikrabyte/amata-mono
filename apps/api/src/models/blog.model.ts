import mongoose, { Document, Schema } from "mongoose";
import { IBlog } from "../interfaces";
// import slugify from "slugify";


const blogSchema = new mongoose.Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    metaTitle: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    tags: [{
      type: String,
      required: true,
    }],
    content: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// blogSchema.pre<IBlog>("save", async function (next) {
//   if (this.isNew || this.isModified("title")) {
//     this.slug = slugify(this.title, { lower: true, strict: true });
//   }
//   if (this.isDeleted) {
//     const match = this.slug.match(/^(.*?)(-deleted(-\d+)?)?$/);
//     if (match) {
//       let baseSlug = match[1];
//       let counter = 1;
//       let newSlug = `${baseSlug}-deleted`;
//       while (await Blog.findOne({ slug: newSlug })) {
//         newSlug = `${baseSlug}-deleted-${counter}`;
//         counter++;
//       }
//       this.slug = newSlug;
//     }
//   }
//   next();
// });

export const BlogModel = mongoose.model<IBlog>("blog", blogSchema);
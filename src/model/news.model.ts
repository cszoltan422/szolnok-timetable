import mongoose from "mongoose";

export type NewsModel = mongoose.Document & {
    effectiveDate: string,
    title: string,
    detailed: boolean,
    content: string
    _class: string
};

const NewsSchema = new mongoose.Schema({
    effectiveDate: { type: String, required: true },
    title: { type: String, required: true },
    detailed: { type: Boolean, required: true },
    content: { type: String, required: true },
    _class: String
}, {collection: "szolnokNewsArticle"});

const News = mongoose.model("szolnokNewsArticle", NewsSchema);
export default News;
import React from "react";
import { Text, RichText, Link } from "@sitecore-jss/sitecore-jss-react";
import RouterLink from "../../atoms/RouterLink";
import ResponsiveLazyImage from "../../atoms/ResponsiveLazyImage";

const TeaserText = ({ title, text }) => (
  <div className="w-5/6 sm:w-1/2 p-6">
    <Text
      tag="h3"
      field={title}
      className="text-3xl text-gray-800 font-bold leading-none mb-3"
    />
    <RichText tag="p" className="text-gray-600 mb-8" field={text} />
  </div>
);

const TeaserImage = ({ image }) => (
  <div className="w-full sm:w-1/2 p-6">
    <ResponsiveLazyImage {...image?.value} className="w-full sm:h-64 mx-auto" />
  </div>
);

const Teaser = ({ index, fields }) => (
  <div
    className={`flex flex-wrap ${
      index % 2 == 0 ? "" : "flex-col-reverse sm:flex-row"
    }`}
  >
    {index % 2 == 0 ? <TeaserText {...fields} /> : <TeaserImage {...fields} />}
    {index % 2 == 0 ? <TeaserImage {...fields} /> : <TeaserText {...fields} />}
  </div>
);

const TeaserSection = ({ fields }) => {
  if (!fields) {
    return null;
  }

  const { title, teasers } = fields;
  return (
    <section className="bg-white border-b py-8">
      <div className="container max-w-5xl mx-auto m-8">
        <Text
          tag="h1"
          field={title}
          className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
        />
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
        </div>

        {teasers &&
          teasers.map((teaser, index) => (
            <Teaser key={index} index={index} {...teaser} />
          ))}
      </div>
    </section>
  );
};

export default TeaserSection;

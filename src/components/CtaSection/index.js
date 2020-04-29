import React from "react";
import { Text, RichText } from "@sitecore-jss/sitecore-jss-react";
import RouterLink from "../../atoms/RouterLink";

const Teaser = ({ title, text, ctaTitle, ctaLink }) => (
  <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
    <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
      <a href="#" className="flex flex-wrap no-underline hover:no-underline">
        <Text
          tag="div"
          field={title}
          className="w-full font-bold text-xl text-gray-800 px-6"
        />
        <RichText
          tag="p"
          className="text-gray-800 text-base px-6 mb-5"
          field={text}
        />
      </a>
    </div>
    <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
      <div className="flex items-center justify-start">
        {ctaLink && ctaLink.value && (
          <RouterLink
            href={ctaLink?.value?.href}
            className="mx-auto lg:mx-0 hover:underline gradient text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg"
          >
            <Text field={ctaTitle} />
          </RouterLink>
        )}
      </div>
    </div>
  </div>
);

const CtaSection = ({ fields }) => {
  if (!fields) {
    return null;
  }

  const { title, teasers } = fields;
  return (
    <section className="bg-white border-b py-8">
      <div className="container mx-auto flex flex-wrap pt-4 pb-12">
        <Text
          tag="h1"
          field={title}
          className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
        />
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
        </div>
        {teasers &&
          teasers.map((teaser, index) => <Teaser key={index} {...teaser.fields} />)}
      </div>
    </section>
  );
};

export default CtaSection;

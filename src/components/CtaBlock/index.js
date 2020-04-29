import React from "react";
import { Text, RichText, Image, Link } from "@sitecore-jss/sitecore-jss-react";
import RouterLink from "../../atoms/RouterLink";

const CtaBlock = ({ fields }) => {
  if (!fields) {
    return null;
  }

  const { title, text, ctaTitle, ctaLink } = fields;
  return (
    <section className="container mx-auto text-center py-6 mb-12">
      <Text
        tag="h1"
        field={title}
        className="w-full my-2 text-5xl font-bold leading-tight text-center text-white"
      ></Text>
      <div className="w-full mb-4">
        <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t" />
      </div>
      <RichText tag="h3" field={text} className="my-4 text-3xl leading-tight" />
      <br />
      {ctaLink && ctaLink.value && (
        <RouterLink
          href={ctaLink?.value?.href}
          className="mx-auto mt-3 lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg"
        >
          <Text field={ctaTitle} />
        </RouterLink>
      )}
    </section>
  );
};

export default CtaBlock;

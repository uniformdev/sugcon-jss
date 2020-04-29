import React from "react";
import { Text, RichText, Image, Link } from "@sitecore-jss/sitecore-jss-react";
import RouterLink from "../../atoms/RouterLink";

const HighligthedPricingTier = ({
  title,
  price,
  ctaLink,
  ctaTitle,
  lineItems,
}) => (
  <div className="flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-white mt-4 sm:-mt-6 shadow-lg z-10">
    <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
      <Text
        tag="div"
        field={title}
        className="w-full p-8 text-3xl font-bold text-center"
      />
      <div className="h-1 w-full gradient my-0 py-0 rounded-t" />
      <ul className="w-full text-center text-base font-bold">
        {lineItems?.value &&
          lineItems?.value.split(",").map((lineItem, index) => (
            <li key={index} className="border-b py-4">
              {lineItem}
            </li>
          ))}
      </ul>
    </div>
    <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
      <Text
        tag="div"
        field={price}
        className="w-full pt-6 text-4xl font-bold text-center"
      />
      <div className="flex items-center justify-center">
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

const PricingTier = ({ index, title, price, ctaLink, ctaTitle, lineItems }) => (
  <div className="flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-white mt-4">
    <div className="flex-1 bg-white text-gray-600 rounded-t rounded-b-none overflow-hidden shadow">
      <Text
        tag="div"
        field={title}
        className="p-8 text-3xl font-bold text-center border-b-4"
      />
      <ul className="w-full text-center text-sm">
        {lineItems?.value &&
          lineItems?.value.split(",").map((lineItem, index) => (
            <li key={index} className="border-b py-4">
              {lineItem}
            </li>
          ))}
      </ul>
    </div>
    <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6">
      <Text
        tag="div"
        field={price}
        className="w-full pt-6 text-3xl text-gray-600 font-bold text-center"
      />
      <div className="flex items-center justify-center">
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
const PricingSection = ({ fields }) => {
  if (!fields) {
    return null;
  }

  const { title, levels } = fields;
  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
        <Text
          tag="h1"
          field={title}
          className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
        />
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
        </div>
        <div className="flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4">
          {levels &&
            levels.map((level, index) =>
              index === 1 ? (
                <HighligthedPricingTier {...level.fields} key={index} />
              ) : (
                <PricingTier {...level.fields} key={index} />
              )
            )}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

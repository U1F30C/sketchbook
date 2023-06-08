type TranslationBuilder<T> = {
  [key in keyof T]: TranslationBuilder<T[key]>;
} & { getTranslationPath(): string };

const uncommonKeyToStorePath: string = "__uncommonGetTranslationProxyPath__";
const pathAccessMethodKey: keyof Pick<TranslationBuilder<{}>, "getTranslationPath"> = "getTranslationPath";

// function that returns a proxy that stores the path to the property accessed
function getTranslationProxy<T>(): TranslationBuilder<T> {
  const accessorData = {
    [uncommonKeyToStorePath]: [],
  };
  const proxy: TranslationBuilder<T> = new Proxy(accessorData as any, {
    get(target, property) {
      if (property === pathAccessMethodKey) {
        return () => {
          const fullAccessProp = accessorData[uncommonKeyToStorePath].join(".");
          accessorData[uncommonKeyToStorePath] = [];
          return fullAccessProp;
        };
      }
      target[uncommonKeyToStorePath].push(property);
      return proxy;
    },
  });
  return proxy;
}


// * usage
// You'd need to be able to import you translation file as a json object
// import Translations from "translation/lang/index.json"

const Translations = {
  hello: "hola",
  foods: { bread: "pan", carrot: "zanahoria", desserts: { cake: "pastel" } },
};
// Translations.path.translatedString;

const translations = getTranslationProxy<typeof Translations>();
console.log(translations.foods.desserts.cake.getTranslationPath());
// 'translations.foods.desserts.cake'
console.log(translations.foods.bread.getTranslationPath());
// 'translations.foods.bread'

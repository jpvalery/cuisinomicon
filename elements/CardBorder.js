import Bakery from "../elements/iconset/Bakery";
import Chopsticks from "../elements/iconset/Chopsticks";
import Cover from "../elements/iconset/Cover";
import Knife from "../elements/iconset/Knife";

import Champagne from "../elements/iconset/Champagne";
import Cocktail from "../elements/iconset/Cocktail";
import CocktailLong from "../elements/iconset/CocktailLong";
import Chemistry from "../elements/iconset/Chemistry";

import Fish from "../elements/iconset/Fish";
import Hatchet from "../elements/iconset/Hatchet";
import Takeout from "../elements/iconset/Takeout";

const CardBorder = (props) => {
  let borderColor;
  let cornerColor;
  let cornerColorOpposite;

  let cornerIconTopLeft;
  let cornerIconTopRight;
  let cornerIconBottomLeft;
  let cornerIconBottomRight;

  if (props.category == "manger") {
    borderColor = "border-gradient-manger";
    cornerColor = "corner-tlbr-manger";
    cornerColorOpposite = "corner-trbl-manger";
    cornerIconTopLeft = <Bakery />;
    cornerIconTopRight = <Chopsticks />;
    cornerIconBottomLeft = (
      <div className="rotate-45 transform">
        <Cover />
      </div>
    );
    cornerIconBottomRight = <Knife />;
  } else if (props.category == "boire") {
    borderColor = "border-gradient-boire";
    cornerColor = "corner-tlbr-boire";
    cornerColorOpposite = "corner-trbl-boire";
    cornerIconTopLeft = (
      <div className="rotate-45 transform">
        <Cocktail />
      </div>
    );
    cornerIconTopRight = (
      <div className="rotate-45 transform">
        <CocktailLong />
      </div>
    );
    cornerIconBottomLeft = (
      <div className="rotate-45 transform">
        <Chemistry />
      </div>
    );
    cornerIconBottomRight = (
      <div className="rotate-45 transform">
        <Champagne />
      </div>
    );
  } else {
    borderColor = "border-gradient-brand";
    cornerColor = "corner-tlbr-brand";
    cornerColorOpposite = "corner-trbl-brand";
    cornerIconTopLeft = <Hatchet />;
    cornerIconTopRight = <Chopsticks />;
    cornerIconBottomLeft = (
      <div className="rotate-45 transform">
        <Takeout />
      </div>
    );
    cornerIconBottomRight = <Fish />;
  }

  return (
    <>
      <div
        id="border"
        className={`absolute inset-2 h-9/10 w-9/10 border-2 ${borderColor}`}
      ></div>
      <div
        id="corner-tl"
        className={`absolute top-2 left-2 rotate-90 transform bg-yellow-50 ${cornerColor}`}
      >
        <div className="h-6 w-6 p-0.5">{cornerIconTopLeft}</div>
      </div>
      <div
        id="corne-tr"
        className={`absolute top-2 right-2 rotate-180 transform bg-yellow-100 ${cornerColorOpposite}`}
      >
        <div className="h-6 w-6 p-0.5">{cornerIconTopRight}</div>
      </div>
      <div
        id="corner-br"
        className={`absolute bottom-2 right-2 -rotate-90 transform bg-yellow-50 ${cornerColor}`}
      >
        <div className="h-6 w-6 p-0.5">{cornerIconBottomLeft}</div>
      </div>
      <div
        id="corner-bl"
        className={`absolute bottom-2 left-2 bg-yellow-100 ${cornerColorOpposite}`}
      >
        <div className="h-6 w-6 p-0.5">{cornerIconBottomRight}</div>
      </div>
    </>
  );
};

export default CardBorder;

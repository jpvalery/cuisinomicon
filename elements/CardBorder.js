import Bakery from "../elements/iconset/Bakery";
import Chopsticks from "../elements/iconset/Chopsticks"
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
    cornerColor= "corner-tlbr-manger";
    cornerColorOpposite = "corner-trbl-manger";
    cornerIconTopLeft = <Bakery />
    cornerIconTopRight = <Chopsticks />
    cornerIconBottomLeft = <div className="transform rotate-45"><Cover /></div>
    cornerIconBottomRight = <Knife />

  } else if (props.category == "boire") {
    borderColor = "border-gradient-boire";
    cornerColor = "corner-tlbr-boire";
    cornerColorOpposite = "corner-trbl-boire";
    cornerIconTopLeft = <div className="transform rotate-45"><Cocktail /></div>;
    cornerIconTopRight = <div className="transform rotate-45"><CocktailLong /></div>;
    cornerIconBottomLeft = <div className="transform rotate-45"><Chemistry /></div>;
    cornerIconBottomRight = <div className="transform rotate-45"><Champagne /></div>;
  } else {
    borderColor = "border-gradient-brand";
    cornerColor = "corner-tlbr-brand";
    cornerColorOpposite = "corner-trbl-brand";
    cornerIconTopLeft = <Hatchet />;
    cornerIconTopRight = <Chopsticks />;
    cornerIconBottomLeft = <div className="transform rotate-45"><Takeout /></div>;
    cornerIconBottomRight = <Fish />;
  }

  return (
    <>
      <div
        id="border"
        className={`absolute border-2 inset-2 w-9/10 h-9/10 ${borderColor}`}
      ></div>
      <div
        id="corner-tl"
        className={`absolute transform rotate-90 bg-yellow-50 top-2 left-2 ${cornerColor}`}
      >
        <div className="w-6 h-6 p-0.5">{cornerIconTopLeft}</div>
      </div>
      <div
        id="corne-tr"
        className={`absolute transform rotate-180 bg-yellow-100 top-2 right-2 ${cornerColorOpposite}`}
      >
        <div className="w-6 h-6 p-0.5">{cornerIconTopRight}</div>
      </div>
      <div
        id="corner-br"
        className={`absolute transform -rotate-90 bg-yellow-50 bottom-2 right-2 ${cornerColor}`}
      >
        <div className="w-6 h-6 p-0.5">{cornerIconBottomLeft}</div>
      </div>
      <div
        id="corner-bl"
        className={`absolute bg-yellow-100 bottom-2 left-2 ${cornerColorOpposite}`}
      >
        <div className="w-6 h-6 p-0.5">{cornerIconBottomRight}</div>
      </div>
    </>
  );
};

export default CardBorder;
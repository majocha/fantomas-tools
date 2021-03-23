import { Union } from "../fable-library.3.1.7/Types.js";
import { union_type, list_type, class_type, bool_type } from "../fable-library.3.1.7/Reflection.js";
import { keyValueList } from "../fable-library.3.1.7/MapUtil.js";
import * as react from "../../../../_snowpack/pkg/react.js";
import { Label } from "../../../../_snowpack/pkg/reactstrap.js";

export class LabelProps extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Check", "Custom"];
    }
}

export function LabelProps$reflection() {
    return union_type("Reactstrap.Label.LabelProps", [], LabelProps, () => [[["Item", bool_type]], [["Item", list_type(class_type("Fable.React.Props.IHTMLProp"))]]]);
}

export function label(props, elems) {
    const props_1 = keyValueList(props, 1);
    return react.createElement(Label, props_1, ...elems);
}

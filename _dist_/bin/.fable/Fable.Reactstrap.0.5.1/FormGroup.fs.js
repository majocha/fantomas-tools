import { Union } from "../fable-library.3.0.1/Types.js";
import { union_type, list_type, obj_type, class_type, bool_type } from "../fable-library.3.0.1/Reflection.js";
import { keyValueList } from "../fable-library.3.0.1/MapUtil.js";
import { choose, collect } from "../fable-library.3.0.1/Seq.js";
import { empty } from "../fable-library.3.0.1/List.js";
import * as react from "../../../../_snowpack/pkg/react.js";
import { FormGroup } from "../../../../_snowpack/pkg/reactstrap.js";

export class FormGroupProps extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Row", "Check", "Inline", "Disabled", "CssModule", "Tag", "Custom"];
    }
}

export function FormGroupProps$reflection() {
    return union_type("Reactstrap.FormGroup.FormGroupProps", [], FormGroupProps, () => [[["Item", bool_type]], [["Item", bool_type]], [["Item", bool_type]], [["Item", bool_type]], [["Item", class_type("Reactstrap.Common.CSSModule")]], [["Item", obj_type]], [["Item", list_type(class_type("Fable.React.Props.IHTMLProp"))]]]);
}

export function formGroup(props, elems) {
    const customProps = keyValueList(collect((_arg1) => {
        if (_arg1.tag === 6) {
            return _arg1.fields[0];
        }
        else {
            return empty();
        }
    }, props), 1);
    const typeProps = keyValueList(choose((_arg2) => {
        if (_arg2.tag === 6) {
            return void 0;
        }
        else {
            return _arg2;
        }
    }, props), 1);
    return react.createElement(FormGroup, Object.assign({}, customProps, typeProps), ...elems);
}


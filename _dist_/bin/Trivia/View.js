import { equals } from "../.fable/fable-library.3.1.15/Util.js";
import { TabPaneProps, tabPane } from "../.fable/Fable.Reactstrap.0.5.1/TabPane.fs.js";
import { DOMAttr, HTMLAttr } from "../.fable/Fable.React.7.0.1/Fable.React.Props.fs.js";
import { ofArray, singleton } from "../.fable/fable-library.3.1.15/List.js";
import { Msg, ActiveTab } from "./Model.js";
import { view as view_1 } from "./ByTriviaNodes.js";
import { view as view_2 } from "./ByTriviaNodeCandidates.js";
import { view as view_3 } from "./ByTrivia.js";
import { NavItemProps, navItem } from "../.fable/Fable.Reactstrap.0.5.1/NavItem.fs.js";
import { NavLinkProps, navLink } from "../.fable/Fable.Reactstrap.0.5.1/NavLink.fs.js";
import { createElement } from "../../../_snowpack/pkg/react.js";
import * as react from "../../../_snowpack/pkg/react.js";
import { NavProps, nav } from "../.fable/Fable.Reactstrap.0.5.1/Nav.fs.js";
import { TabContentProps, tabContent as tabContent_1 } from "../.fable/Fable.Reactstrap.0.5.1/TabContent.fs.js";
import { loader } from "../Loader.js";
import { MonacoEditorProp, Editor } from "../Editor.js";
import { ButtonProps, button } from "../.fable/Fable.Reactstrap.0.5.1/Button.fs.js";
import { versionBar } from "../VersionBar.js";
import { printf, toText } from "../.fable/fable-library.3.1.15/String.js";
import { toggleButton, input } from "../SettingControls.js";

function tabToId(tab_1) {
    switch (tab_1.tag) {
        case 1: {
            return "trivia";
        }
        case 2: {
            return "trivia-nodes-candidates";
        }
        default: {
            return "trivia-nodes";
        }
    }
}

function tab(activeTab, tabType, tabContent) {
    const tabClassName = equals(activeTab, tabType) ? "active show" : "";
    return tabPane([new TabPaneProps(1, tabToId(tabType)), new TabPaneProps(3, singleton(new HTMLAttr(64, tabClassName)))], [tabContent]);
}

function byTriviaNodes(model, dispatch) {
    return tab(model.ActiveTab, new ActiveTab(0), view_1(model, dispatch));
}

function byTriviaNodeCandidates(model, dispatch) {
    return tab(model.ActiveTab, new ActiveTab(2), view_2(model, dispatch));
}

function byTrivia(model, dispatch) {
    return tab(model.ActiveTab, new ActiveTab(1), view_3(model, dispatch));
}

function results(model, dispatch) {
    const tabHeader = (label, tabType) => navItem([new NavItemProps(2, ofArray([new DOMAttr(40, (_arg1) => {
        dispatch(new Msg(0, tabType));
    }), new HTMLAttr(64, "pointer")]))], [navLink([new NavLinkProps(0, equals(tabType, model.ActiveTab)), new NavLinkProps(3, singleton(new HTMLAttr(64, "rounded-0")))], [label])]);
    return react.createElement("div", {
        id: "results",
    }, nav([new NavProps(0, true), new NavProps(1, true), new NavProps(9, singleton(new HTMLAttr(64, "border-bottom border-primary")))], [tabHeader("Trivia nodes", new ActiveTab(0)), tabHeader("Trivia node candidates", new ActiveTab(2)), tabHeader("Trivia", new ActiveTab(1))]), tabContent_1([new TabContentProps(3, singleton(new HTMLAttr(99, "trivia-result-content"))), new TabContentProps(1, tabToId(model.ActiveTab))], [byTriviaNodes(model, dispatch), byTriviaNodeCandidates(model, dispatch), byTrivia(model, dispatch)]));
}

export function view(model, dispatch) {
    if (model.IsLoading) {
        return loader;
    }
    else {
        const matchValue = model.Error;
        if (matchValue != null) {
            const errors = matchValue;
            return createElement(Editor, {
                isReadOnly: true,
                props: singleton(new MonacoEditorProp(2, errors)),
            });
        }
        else {
            return results(model, dispatch);
        }
    }
}

export function commands(dispatch) {
    return button([new ButtonProps(1, "primary"), new ButtonProps(9, ofArray([new HTMLAttr(64, "rounded-0"), new DOMAttr(40, (_arg1) => {
        dispatch(new Msg(1));
    })]))], [react.createElement("i", {
        className: "fas fa-code mr-1",
    }), "Get trivia"]);
}

export function settings(model, dispatch) {
    return react.createElement(react.Fragment, {}, versionBar(toText(printf("FSC - %s"))(model.Version)), input("trivia-defines", (arg) => {
        dispatch(new Msg(4, arg));
    }, "Defines", "Enter your defines separated with a space", model.Defines), toggleButton((_arg1) => {
        dispatch(new Msg(6, true));
    }, (_arg2) => {
        dispatch(new Msg(6, false));
    }, "*.fsi", "*.fs", "File extension", model.IsFsi));
}

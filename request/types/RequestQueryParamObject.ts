// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import RequestParamValueType, {isRequestParamValueType} from "./RequestParamValueType";
import InterfaceUtils from "../RequestInterfaceUtils";
import {isString} from "../../modules/lodash";
import RequestParamObjectType from "./RequestParamObjectType";

export interface RequestQueryParamObject {

    objectType : RequestParamObjectType.QUERY_PARAM;
    valueType  : RequestParamValueType;
    queryParam : string;

}

export function isRequestQueryParamObject(value: any): value is RequestQueryParamObject {
    return (
        !!value
        && value?.objectType === RequestParamObjectType.QUERY_PARAM
        && isString(value?.queryParam)
        && isRequestParamValueType(value?.valueType)
    );
}

export default RequestQueryParamObject;

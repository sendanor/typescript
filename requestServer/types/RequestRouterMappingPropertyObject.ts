// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import RequestMethod from "../../request/types/RequestMethod";
import {RequestParamObject} from "../../request/types/RequestParamObject";

export interface RequestRouterMappingPropertyObject {

    requestBodyRequired  : boolean;
    methods              : Array<RequestMethod>;
    controller           : any;
    propertyName         : string;
    propertyParams       : Array<RequestParamObject | null>;

}

export default RequestRouterMappingPropertyObject;

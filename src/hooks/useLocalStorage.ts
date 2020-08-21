/*
Copyright 2019 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {useEffect, useRef, useState} from "react";

// Hook behaving like useState but persisting the value to localStorage. Returns same as useState
export const useLocalStorageState = (key: string, initialValue: boolean) => {
    const lsKey = useRef("useLocalStorageState_" + key).current;

    const [value, setValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(lsKey);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    useEffect(() => {
        window.localStorage.setItem(lsKey, JSON.stringify(value));
    }, [lsKey, value]);

    return [value, setValue];
};

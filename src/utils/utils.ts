import * as Types from './types';
import * as Enums from './enums';

import { chatStore } from '../stores';

export const characterSort = (a, b) => {
    let charA: Types.Character = chatStore.getCharacter(a);
    let charB: Types.Character = chatStore.getCharacter(b);
    if(charA == undefined) console.log("charA: " + a + ", " + charA);
    if(charB == undefined) console.log("charB: " + b + ", " + charB);
    if(charA.status == Enums.Status.Looking && charB.status != Enums.Status.Looking) return -1;
    if(charB.status == Enums.Status.Looking && charA.status != Enums.Status.Looking) return 1;
    if(charA.name < charB.name) return -1;
    if(charB.name < charA.name) return 1;
    return 0;
};
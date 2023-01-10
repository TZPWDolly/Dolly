
export const DuplicateFunction = (seperateArr) => {
    const resultt = [];
    const pparr = []
    for (var d of seperateArr) {
        for (var e of d) {
            const f = resultt.find(f => f.ccode === e.ccode);
            if (f) {
                f.name.push(e.pname);
            } else {
                resultt.push({ name: [e.pname], ccode: e.ccode, ccname: e.cname })
            }
        }
    }
    for (var d of resultt) {
        if (d.name.length > 1) {
            pparr.push(d)

        }
    }
    return pparr;
}
        
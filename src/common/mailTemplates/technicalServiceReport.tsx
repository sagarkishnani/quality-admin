import logo from "../../assets/mailBackgrounds/technicalServiceReportBG.svg";

// const dataExample = {
//     date: '01/01/2023',
//     init_hour: '08:00',
//     end_hour: '12:00',
//     business: 'business',
//     address: 'address',
//     local: 'local',
//     floor: 'floor',
//     area: 'area',
//     user: 'user',
//     equipments: [
//         {
//             equipment: "q.1",
//             ns: "asdasdas",
//             counter: "3r4",
//             guide: "894"
//         },
//         {
//             equipment: "eq.1",
//             ns: "asdasdas",
//             counter: "3r4",
//             guide: "894"
//         },
//     ],
//     userIssue: "userIssue",
//     fixerIssue: "fixerIssue",
//     revision: {
//         b1: "b",
//         b2: "b",
//         b3: "b",
//         b4: "b",
//         b5: "b",
//         b6: "b",
//         b7: "b",
//         b8: "b",
//         b9: "b",
//         b10: "b",
//         b11: "b",
//         b12: "b",
//     },
//     procedure: {
//         p1: "p",
//         p2: "p",
//         p3: "p",
//         p4: "p",
//         p5: "p",
//         p6: "p",
//         p7: "p",
//         p8: "p",
//         p9: "p",
//         p10: "p",
//         p11: "p",
//         p12: "p",
//         p13: "p",
//         p14: "p",
//         p15: "p",
//         p16: "p",
//         p17: "p",
//         p18: "p",
//         p19: "p",
//         p20: "p",
//         p21: "p",
//         p22: "p",
//         p23: "p",
//         p24: "p",
//         p25: "p",
//         p26: "p",
//         p27: "p",
//         p28: "p",
//         p29: "p",
//         p30: "p",
//         p31: "p",
//         p32: "p",
//         p33: "p",
//         p34: "p",
//         p35: "p",
//         p36: "p",
//     },
//     comments: {
//         c1: "c",
//         c2: "c",
//         c3: "c",
//         c4: "c",
//         c5: "c",
//         c6: "c",
//         c7: "c",
//         c8: "c",
//         c9: "c",
//         c10: "c",
//         c11: "c",
//         c12: "c",
//         c13: "c",
//         c14: "c",
//     },
//     instalation: "x",
//     guarantee: "x",
//     negligence: "x",
//     visit: "x",
//     maintenance: "x",
//     comment: "comment",
//     recomendation: "recomendation"
// }


export default function TechnicalServiceReport({ data }) {
    return (
        <div style={{ position: "relative", fontSize: "12px", width: "780px" }}>
            <img src={logo} width="100%" />

            <div>
                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "82px",
                        top: "94px",
                        left: "234px",
                        zIndex: "99",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {data.date}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "65px",
                        top: "94px",
                        left: "395px",
                        zIndex: "99",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {data.init_hour}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "128px",
                        top: "94px",
                        left: "535px",
                        zIndex: "99",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {data.end_hour}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "402px",
                        top: "108px",
                        left: "234px",
                        zIndex: "99",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {data.business}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "402px",
                        top: "124px",
                        left: "234px",
                        zIndex: "99",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {data.address}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "255px",
                        top: "141px",
                        left: "234px",
                        zIndex: "99",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {data.local}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "120px",
                        top: "141px",
                        left: "545px",
                        zIndex: "99",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {data.floor}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "402px",
                        top: "155px",
                        left: "234px",
                        zIndex: "99",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {data.area}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "402px",
                        top: "172px",
                        left: "234px",
                        zIndex: "99",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {data.user}
                </div>
            </div>

            <div>
                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "100px",
                        top: "203px",
                        left: "165px",
                        zIndex: "99",
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                    }}
                >
                    {data.equipments[0].equipment}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "99px",
                        top: "203px",
                        left: "308px",
                        zIndex: "99",
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                    }}
                >
                    {data.equipments[0].ns}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "75px",
                        top: "203px",
                        left: "472px",
                        zIndex: "99",
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                    }}
                >
                    {data.equipments[0].counter}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "63px",
                        top: "203px",
                        left: "612px",
                        zIndex: "99",
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                    }}
                >
                    {data.equipments[0].guide}
                </div>

                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "70px",
                        top: "220px",
                        left: "195px",
                        zIndex: "99",
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                    }}
                >
                    {data.equipments[1].equipment}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "99px",
                        top: "220px",
                        left: "308px",
                        zIndex: "99",
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                    }}
                >
                    {data.equipments[1].ns}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "75px",
                        top: "220px",
                        left: "472px",
                        zIndex: "99",
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                    }}
                >
                    {data.equipments[1].counter}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "10px",
                        width: "63px",
                        top: "220px",
                        left: "612px",
                        zIndex: "99",
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                    }}
                >
                    {data.equipments[1].guide}
                </div>
            </div>

            <div>
                <div
                    style={{
                        position: "absolute",
                        height: "42px",
                        width: "551px",
                        top: "247px",
                        left: "129px",
                        zIndex: "99",
                        lineHeight: "14px",
                        textIndent: "290px",
                    }}
                >
                    {data.userIssue}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "42px",
                        width: "551px",
                        top: "290px",
                        left: "132px",
                        zIndex: "99",
                        lineHeight: "14px",
                        textIndent: "190px",
                    }}
                >
                    {data.fixerIssue}
                </div>
            </div>

            <div>
                <div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "348px",
                            left: "231px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.revision.b1}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "360px",
                            left: "231px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.revision.b2}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "372px",
                            left: "231px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.revision.b3}
                    </div>
                </div>
                <div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "348px",
                            left: "372px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.revision.b4}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "360px",
                            left: "372px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.revision.b5}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "372px",
                            left: "372px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.revision.b6}
                    </div>
                </div>
                <div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "360px",
                            left: "516px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.revision.b7}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "372px",
                            left: "516px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.revision.b8}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "348px",
                            left: "516px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.revision.b9}
                    </div>
                </div>
                <div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "348px",
                            left: "659px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.revision.b10}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "360px",
                            left: "659px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.revision.b11}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "372px",
                            left: "659px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.revision.b12}
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "425px",
                            left: "230px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p1}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "437px",
                            left: "230px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p2}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "450px",
                            left: "230px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p3}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "462px",
                            left: "230px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p4}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "474px",
                            left: "230px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p5}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "488px",
                            left: "230px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p6}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "502px",
                            left: "230px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p7}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "514px",
                            left: "230px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p8}
                    </div>
                </div>

                <div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "425px",
                            left: "373px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p9}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "437px",
                            left: "373px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p10}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "450px",
                            left: "373px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p11}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "462px",
                            left: "373px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p12}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "474px",
                            left: "373px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p13}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "488px",
                            left: "373px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p14}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "502px",
                            left: "373px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p15}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "514px",
                            left: "373px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p16}
                    </div>
                </div>

                <div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "425px",
                            left: "516px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p17}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "437px",
                            left: "516px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p18}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "450px",
                            left: "516px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p19}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "462px",
                            left: "516px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p20}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "474px",
                            left: "516px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p21}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "488px",
                            left: "516px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p22}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "502px",
                            left: "516px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p23}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "514px",
                            left: "516px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p24}
                    </div>
                </div>

                <div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "425px",
                            left: "660px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p25}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "437px",
                            left: "660px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p26}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "450px",
                            left: "660px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p27}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "462px",
                            left: "660px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p28}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "474px",
                            left: "660px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p29}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "488px",
                            left: "660px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p30}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "502px",
                            left: "660px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p31}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "514px",
                            left: "660px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p32}
                    </div>

                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "526px",
                            left: "660px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p33}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "538px",
                            left: "660px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p34}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "551px",
                            left: "660px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p35}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "12px",
                            width: "19px",
                            top: "564px",
                            left: "660px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.procedure.p36}
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <div
                        style={{
                            position: "absolute",
                            height: "14px",
                            width: "19px",
                            top: "605px",
                            left: "230px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.comments.c1}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "14px",
                            width: "19px",
                            top: "620px",
                            left: "230px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.comments.c2}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "14px",
                            width: "19px",
                            top: "635px",
                            left: "230px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.comments.c3}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "14px",
                            width: "19px",
                            top: "650px",
                            left: "230px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.comments.c4}
                    </div>
                </div>

                <div>
                    <div
                        style={{
                            position: "absolute",
                            height: "14px",
                            width: "19px",
                            top: "605px",
                            left: "373px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.comments.c5}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "14px",
                            width: "19px",
                            top: "620px",
                            left: "373px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.comments.c6}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "14px",
                            width: "19px",
                            top: "635px",
                            left: "373px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.comments.c7}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "14px",
                            width: "19px",
                            top: "650px",
                            left: "373px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.comments.c8}
                    </div>
                </div>

                <div>
                    <div
                        style={{
                            position: "absolute",
                            height: "14px",
                            width: "19px",
                            top: "605px",
                            left: "515px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.comments.c9}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "14px",
                            width: "19px",
                            top: "620px",
                            left: "515px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.comments.c10}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "14px",
                            width: "19px",
                            top: "635px",
                            left: "515px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.comments.c11}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "14px",
                            width: "19px",
                            top: "650px",
                            left: "515px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.comments.c12}
                    </div>
                </div>

                <div>
                    <div
                        style={{
                            position: "absolute",
                            height: "14px",
                            width: "19px",
                            top: "605px",
                            left: "658px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.comments.c13}
                    </div>
                    <div
                        style={{
                            position: "absolute",
                            height: "14px",
                            width: "19px",
                            top: "620px",
                            left: "658px",
                            zIndex: "99",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {data.comments.c14}
                    </div>
                </div>
            </div>

            <div>
                <div
                    style={{
                        position: "absolute",
                        height: "14px",
                        width: "19px",
                        top: "695px",
                        left: "230px",
                        zIndex: "99",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {data.instalation}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "14px",
                        width: "19px",
                        top: "695px",
                        left: "373px",
                        zIndex: "99",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {data.guarantee}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "14px",
                        width: "19px",
                        top: "695px",
                        left: "516px",
                        zIndex: "99",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {data.negligence}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "14px",
                        width: "19px",
                        top: "695px",
                        left: "659px",
                        zIndex: "99",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {data.maintenance}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "14px",
                        width: "19px",
                        top: "710px",
                        left: "659px",
                        zIndex: "99",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {data.visit}
                </div>
            </div>

            <div>
                <div
                    style={{
                        position: "absolute",
                        height: "54px",
                        width: "494px",
                        top: "724px",
                        left: "142px",
                        zIndex: "99",
                        lineHeight: "16px",
                        textIndent: "67px",
                    }}
                >
                    {data.comment}
                </div>
                <div
                    style={{
                        position: "absolute",
                        height: "54px",
                        width: "494px",
                        top: "798px",
                        left: "142px",
                        zIndex: "99",
                        lineHeight: "16px",
                        textIndent: "95px",
                    }}
                >
                    {data.recomendation}
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect, state, Fragment } from 'react';
import axios from "axios";
export default function MaterialData() {

    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let option = {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    }
    const getData = async () => {
        try {


            const res = await axios.get('http://localhost:3004/api/v1/stastics', option)
            setData(res.data);

        } catch (e) {
            setError(e);
        }
        setLoading(false);

    };
    useEffect(() => {
        getData();
    }, []);
    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>
    if (!data) return null;
    const dataList = data.filter(word => (word.material_item_no < 20));
    return (
        <table>
            <colgroup>
                <col width="20%"></col>
                <col width="50%"></col>
                <col width="30%"></col>
            </colgroup>
            <thead>
                <tr>
                    <th>자재번호</th>
                    <th>자재명</th>
                    <th>수량</th>
                </tr>
            </thead>
            <tbody>

                {dataList.map((item) => (
                    <tr key={item.material_item_no}>
                        <td>{item.material_item_no}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity+"EA"}</td>
                    </tr>
                ))}

            </tbody>
        </table>
    )
}

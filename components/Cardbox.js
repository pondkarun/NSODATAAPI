import React from 'react'
import Icon from '@ant-design/icons';
import Image from 'next/image'
import { Badge } from 'antd';

function Cardbox({ title, image, mode, rawdata }) {
    return (
        <>
            {mode ?
                <>
                    <Badge.Ribbon text={rawdata.maintainer.substring(0, 15) + "..."} color={"#F54"}>
                        <div style={{ cursor: "pointer", position: "relative", border: "2px solid transparent",padding:"10px 0px",  width: '100%', borderRadius: "10px", backgroundColor: "#F9EAC9", display: 'flex', flexDirection: "column", justifyContent: "center" }}>
                            <Icon component={() => <img src={image ? image : "https://www.researchgate.net/profile/Adugna-Oluma/publication/343381585/figure/fig1/AS:919995320111104@1596355385430/Pie-chart-illustrating-the-level-of-food-insecurity-among-the-respondents-among-people.png"} style={{ width: '100%', height: "10em", borderRadius: '10px', alignSelf: "center", objectFit: "contain" }} />} />
                        </div>
                    </Badge.Ribbon>
                    <a title={title} style={{ fontWeight: "bold",}}>{title}</a>
                </>
                :
                <div style={{ cursor: "pointer", margin: "10px", padding: "5px", display: "inline-block", position: "relative", border: "2px solid transparent", width: '100%', borderRadius: "10px", backgroundColor: "#F9EAC9", display: 'flex', flexDirection: "row", alignItems: "center" }}>
                    <Icon component={() => <img src={image ? image : "https://www.researchgate.net/profile/Adugna-Oluma/publication/343381585/figure/fig1/AS:919995320111104@1596355385430/Pie-chart-illustrating-the-level-of-food-insecurity-among-the-respondents-among-people.png"} style={{ width: '50px', height: "50px", borderRadius: '10px', objectFit: "contain" }} />} />
                    <span style={{ fontWeight: "bold", }}>{title}</span>
                </div>
            }
            <style jsx global>
                {`
                .ant-ribbon{
                    top:auto!important;
                    bottom:8px!important;
                }
                `}
            </style>
        </>
    )
}

export default Cardbox

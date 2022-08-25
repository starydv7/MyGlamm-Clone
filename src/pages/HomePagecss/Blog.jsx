import { Box, Flex } from '@chakra-ui/react';
import React from 'react'
import { Link, useParams } from "react-router-dom";

const Blog = () => {
    const { id } = useParams();
    console.log(id);
    let picture = ['https://files.myglamm.com/site-images/original/400x400.jpg']
  return (
   <>
   <div style={{textAlign: 'left', 
                borderBottom: '2px solid white',
                width: '100%',
                margin:'0px 70px',
                paddingLeft:'60px'} }>
        <h3><Link to="/"> Rewards Details</Link></h3></div>
   <div>
    <Flex style={{padding:"5px"}}>
        <img style={{width: '30%',
                     padding: '20px 60px',
                     height: '400px',
                    //  border: '1px solid red'
                     }} src="https://files.myglamm.com/site-images/original/400x400.jpg" alt={id}/>
        <div style={{width: '80%',
                     padding: '150px 400px',
                     height: '400px',
                    //  border: '1px solid red'
                     }}> 
            <img src="https://files.myglamm.com/site-images/original/g3/Logos/Myglamm+2x.png" alt={id}/>
            <h1>Free Product in Selected Range</h1>
        </div>
    </Flex>
    <Box style={{
                //  border: '1px solid red',
                 paddingLeft:'70px',
                 alignContent: 'center',
                 textAlign: 'left',
                 width:'100%',
                height:'500px'}}>
            <h1>ABOUT</h1>
            <small style={{color: 'snow'}}>Get your FREE product from selected range of products including MyGlamm Superfoods Kajal, LIT Liquid Matte Lipsticks, Nail paints, Sheet masks and many more.</small>
           
            <h1>HOW TO CLAIM</h1>
            <ul>
                <small style={{ lineHeight: '1.6'}}>
                    <li>"Click on ‘Get Rewards’ and then click on ‘Confirm'. </li>
                    <li>You will see a confirmation screen that shows the number of GoodPoints you will spend to purchase the reward.</li>
                    <li>Once you confirm, you will get your Coupon Code. </li>
                    <li>Copy this Coupon Code and click on Redeem Now. </li>
                    <li> You will be redirected to the reward brand page </li>
                    <li> You can avail this coupon while completing your purchase. Please redeem your rewards before their validity expires"</li>
                </small>
            </ul>
           <br/>
            <h1>TERMS & CONDITIONS</h1>
            <ul>
                <small style={{ lineHeight: '1.6'}}>
                    <li>"In order to purchase the reward, you must be a registered Good User.  </li>
                    <li> Your GoodPoints can only be redeemed for purchasing rewards. </li>
                    <li> You agree to comply with the terms, conditions, and rules of The Good Points Loyalty Program and the brands involved in your transaction. </li>
                    <li> By confirming, you authorize us to deduct the GoodPoints required to purchase the reward. </li>
                    <li>  Once you unlock the Coupon Code, you will be redirected to the respective brand page to complete your purchase. </li>
                    <li> You can avail this coupon while completing your purchase. Please redeem your rewards before their validity expires"</li>
                </small>
            </ul>
           <br/>
        <button style={{ border: '1px solid red' , color:'white', backgroundColor:'orange'}} type="button">JOIN IN</button>
    </Box>

   </div>
</>
    )
}

export default Blog;
import React from "react";
import {
    Text,
    Flex,
    Center,
    Heading,
    Image

} from '@chakra-ui/react';

export default function Page(){
    return(
        <Flex direction={'column'}>
            <Image src='https://img.freepik.com/free-photo/horizontal-shot-pretty-woman-with-pleasant-smile-face-enjoys-online-communication-cellular-reads-notification-wears-round-spectacles-yellow-t-shirt-technology-people-concept_273609-27746.jpg?t=st=1657282651~exp=1657283251~hmac=32ec2841dd4124715c5bc0f07275ce590e9914fedeb6175aca792146d9404304&w=740 ' alt='phot' w='100%' h='80vh' objectFit={'cover'}/>
            <Flex direction={'column'} m='3'>
                <Heading fontSize={'24px'} textDecoration='underline 3px #ffa31a'>Help us Grow our platform</Heading>
                <Text>Refer us to your landlords / House Agents and bring them on-board to help students get variety of apartments to choose from.</Text>
            </Flex>
            <Flex direction={'column'} m='3'>
                <Heading fontSize={'24px'} textDecoration='underline 3px #ffa31a'>How to refer an apartment?</Heading>
                <Text>1.Sign Up and create an account with Us.</Text>
                <Text>2.Get a referral code.</Text>
                <Text>3.Find an apartment to refer us to.</Text>
                <Text>4.Help them upload their details, i.e photos,descriptions </Text>
                <Text>5.Use your Code in the referred section, before submitting the apartment.</Text>


            </Flex>
            <Flex direction={'column'} m='3'>
                <Text><span style={{color:'#ffa31a',fontSize:'20px'}}>Great!</span> For getting the house onto our platform, <span style={{color:'#ffa31a',fontSize:'20px'}}>20</span> tokens are awarded for each referral which are redeemable.</Text>
            </Flex>
            <Flex direction={'column'} m='3'>
                <Heading fontSize={'24px'} textDecoration='underline 3px #ffa31a'>What are my tokens are reedemable for?</Heading>
                <Text>Tokens awarded can be redeemed for cash/money, airtime, t-shirts,caps</Text>
            </Flex>
            <Flex direction={'column'} m='3'>
                <Heading fontSize={'24px'} textDecoration='underline 3px #ffa31a'>How many tokens do I need to make a reedem request?</Heading>
                <Text>You need:</Text>
                <Text>A minimum of 100-tokens for redeeming tokens to cash</Text>
            </Flex>
            <Flex direction={'column'} m='3'>
                <Heading fontSize={'24px'} textDecoration='underline 3px #ffa31a'>How do i redeem my tokens?</Heading>
                <Text>Redeem your tokens upon request from your account profile page.</Text>
                <Text>Incase of any queries. Feel free to consult by emailing <span style={{color:'#ffa31a'}}>keja.app@outlook.com</span> or calling <span style={{color:'#ffa31a'}}>0771712005</span></Text>
            </Flex>
        </Flex>
    )
}
import React, {useState, useEffect} from 'react';
import {Button, Card, List, message, Select, Tooltip} from "antd";
import {getRestaurants, addItemToCart, getMenus} from "../utils";
import {PlusOutlined} from "@ant-design/icons";

const {Option} = Select;

const AddToCartButton = ({itemId}) => {
    const [loading, setLoading] = useState(false);

    //Add selected menu to the cart
    //step 1, set loading status to true
    //step 2, add menu to cart and inform server
    //step 3, deal with error status
    //step 4, set loading back to false
    const AddToCart = () => {
        setLoading(true);
        addItemToCart(itemId)
            .then(() => message.success(`Successfully add item`))
            .catch((err) => message.error(err.message))
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Tooltip title="Add to shopping cart">
            <Button
                loading={loading}
                type="primary"
                icon={<PlusOutlined/>}
                onClick={AddToCart}
            />
        </Tooltip>
    );
};

const FoodList = () => {
    const [curRest, setCurRest] = useState();       //Current selected option
    const [restaurants, setRestaurants] = useState([]);     //Restaurant list
    const [loadingRest, setLoadingRest] = useState(false);    //Loading restaurant status
    const [curMenu, setCurMenu] = useState([]);     //Menu list of a selected restaurant
    const [loadingMenu, setLoadingMenu] = useState(false);    //Loading menu status


    //Get restaurant list
    useEffect(() => {
        setLoadingRest(true);
        getRestaurants()
            .then((data) => {
                setRestaurants(data);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setLoadingRest(false);
            });
    }, []);

    //Get menu of current selected restaurant
    useEffect(() => {
        if (curRest) {  //Only get menu if there is a selected restaurant
            setLoadingMenu(true);
            getMenus(curRest)
                .then((data) => {
                    setCurMenu(data);
                })
                .catch((err) => {
                    message.error(err.message);
                })
                .finally(() => {
                    setLoadingMenu(false);
                });
        }
    }, [curRest]);

    return (
        <>
            {/*Selection bar*/}
            <Select
                value={curRest}
                onSelect={(value) => setCurRest(value)}
                placeholder="Select a restaurant"
                loading={loadingRest}
                style={{width: 300}}
                onChange={() => {
                }}
            >
                {/*Traverse the restaurant list to display each restaurant*/}
                {restaurants.map((item) => {
                    return <Option key={item.id} value={item.id}>{item.name}</Option>;
                })}
            </Select>

            {/*Foot list, only display if there is a selected restaurant*/}
            {curRest && (
                <List
                    style={{marginTop: 20}}
                    loading={loadingMenu}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 3,
                        xxl: 3
                    }}
                    dataSource={curMenu}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                title={item.name}
                                extra={<AddToCartButton itemId={item.id}/>}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    style={{height: "auto", width: "100%", display: "block"}}
                                />
                                {`Price: ${item.price}`}
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </>
    );
};

export default FoodList;
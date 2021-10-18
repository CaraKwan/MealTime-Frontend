import {Button, Drawer, List, message, Typography} from "antd";
import {useEffect, useState} from "react";
import {checkout, getCart} from "../utils";

const {Text} = Typography;

const MyCart = () => {
    const [cartVisible, setCartVisible] = useState(false);    //Display / hide drawer
    const [cartData, setCartData] = useState();   //Store cart data
    const [loading, setLoading] = useState(false);   //Set cart loading status
    const [checking, setChecking] = useState(false);   //Set checking out loading status

    //Get item added to cart information from server when the cart is visible
    //step 1, set loading status to true
    //step 2, fetch data from server
    //step 3, deal with error status
    //step 4, set loading back to false
    useEffect(() => {
        if (!cartVisible) {
            return;
        }

        setLoading(true);
        getCart()
            .then((data) => {
                setCartData(data);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [cartVisible]);

    //Inform the server to check out
    const onCheckOut = () => {
        setChecking(true);
        checkout()
            .then(() => {
                message.success("Successfully checkout");
                setCartVisible(false);
            })
            .catch((err) => {
                message.error(err.message);
            })
            .finally(() => {
                setChecking(false);
            });
    };

    const onOpenDrawer = () => {
        setCartVisible(true);
    };

    const onCloseDrawer = () => {
        setCartVisible(false);
    };


    return (
        <>
            <Button type="primary" shape="round" onClick={onOpenDrawer}>
                Cart
            </Button>
            <Drawer
                title="My Shopping Cart"
                onClose={onCloseDrawer}
                visible={cartVisible}
                width={520}
                footer={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text strong={true}>{`Total price: $${cartData?.totalPrice}`}</Text>
                        <div>
                            <Button onClick={onCloseDrawer} style={{marginRight: 8}}>
                                Cancel
                            </Button>
                            <Button
                                onClick={onCheckOut}
                                type="primary"
                                loading={checking}
                                disabled={loading || (cartData && cartData.orderItemList && cartData.orderItemList.length === 0)}
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                }
            >
                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={cartData ? cartData.orderItemList : []}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.menuItem.name}
                                description={`$${item.price}`}
                            />
                        </List.Item>
                    )}
                />
            </Drawer>
        </>
    );
};

export default MyCart;
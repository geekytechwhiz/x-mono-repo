"use client";
import React, { useEffect, useRef } from "react";
import ThemeConstants from "../../theme/prelemVariableLight";
import { MessageType } from "./chatEnums";
import ProductList from "./ProductListing";
import ProductDetails from "./ProductDetails/productDetails";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ChatProvider = (props: any) => {
  const { messages = [], name = "Guest" } = props;
  // const { route = {}, site_host } = pageProps;
  // const [cartCount, set_cartCount] = useState<any>(0);
  const chatLogRef = useRef<HTMLDivElement>(null);

  // !!! might need this later !!! bot can add to cart but frontend database needs to be changed on X side
  // const prelemBaseEndpoint = {
  //   ...prelemBaseEndpointObj(site_host),
  //   language: route?.locale,
  //   query: route?.query,
  // };

  // const cartCountUpdate = (ele: any) => {
  //   const { line_item = [] } = nullToObject(ele);
  //   if (ele === null) {
  //     set_cartCount(null);
  //   } else {
  //     set_cartCount(nullToArray(line_item).length);
  //   }
  // };

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef!.current!.scrollIntoView!({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, chatLogRef]);

  return (
    <div
      className='chat-log'
      // ref={chatLogRef}
      style={{
        height: "80%",
        flexGrow: "1",
        overflowY: "auto",
        padding: "10px",
        paddingBottom: "100px",
      }}>
      {messages.map((message: any, index) => {
        // change the following to a switch instead of a shortened if case
        switch (message.messageType) {
          case MessageType.User:
            return (
              <div
                className='user-message'
                key={index.toString() + "key-nemawe3"}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "10px",
                  minWidth: "100px",
                  minHeight: "40px",
                }}>
                <div
                  className='message-content'
                  style={{
                    backgroundColor: "#c1e7ff",
                    borderRadius: "5px",
                    padding: "10px 10px 10px 20px",
                    display: "inline-block",
                    margin: "5px",
                    minWidth: "30%",
                  }}>
                  <div
                    className='sender-name'
                    style={{
                      color: "#10a5ff",
                      fontWeight: "bold",
                    }}>
                    {name}
                  </div>
                  <div className='message-text'>{message.text}</div>
                  <div
                    className='time-stamp'
                    style={{
                      fontSize: ThemeConstants.FONTSIZE_12,
                      textAlign: "right",
                    }}>
                    {message.timeStamp}
                  </div>
                </div>
                <AccountCircleIcon
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "10px",
                    borderRadius: "50%",
                  }}
                />
              </div>
            );
          case MessageType.ProductListing:
            return (
              <div
                className='bot-message'
                key={index.toString() + "key-nemawe4"}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  margin: "10px",
                  minWidth: "100px",
                  minHeight: "40px",
                  overflow: "hidden",
                }}>
                <img
                  src='https://t4.ftcdn.net/jpg/03/51/61/49/360_F_351614912_nhPej8tYdn8gytfBnBPag8HBUt2vaznE.jpg'
                  alt='user'
                  className='profile-pic left'
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "10px",
                    borderRadius: "50%",
                  }}
                />
                <div
                  className='message-content'
                  style={{
                    backgroundColor: "#e8f6ff",
                    borderRadius: "5px",
                    padding: "10px 10px 10px 20px",
                    display: "inline-block",
                    minWidth: "30%",
                  }}>
                  <div
                    className='sender-name'
                    style={{
                      color: "#37b4ff",
                      fontWeight: "bold",
                    }}>
                    Chat Bot
                  </div>
                  <div className='message-text'>{message.text}</div>
                  <div className='product-listing'>
                    <ProductList products={message.items} />
                  </div>
                  <div
                    className='time-stamp'
                    style={{
                      fontSize: ThemeConstants.FONTSIZE_12,
                      textAlign: "right",
                    }}>
                    {message.timeStamp}
                  </div>
                </div>
              </div>
            );
          case MessageType.ProductDetail:
            return (
              <div
                className='bot-message'
                key={index.toString() + "key-nemawe-2"}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  margin: "10px",
                  minWidth: "100px",
                  minHeight: "40px",
                  overflow: "hidden",
                }}>
                <img
                  src='https://t4.ftcdn.net/jpg/03/51/61/49/360_F_351614912_nhPej8tYdn8gytfBnBPag8HBUt2vaznE.jpg'
                  alt='user'
                  className='profile-pic left'
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "10px",
                    borderRadius: "50%",
                  }}
                />
                <div
                  className='message-content'
                  style={{
                    backgroundColor: "#e8f6ff",
                    borderRadius: "5px",
                    padding: "10px 10px 10px 20px",
                    display: "inline-block",
                    minWidth: "30%",
                  }}>
                  <div
                    className='sender-name'
                    style={{
                      color: "#37b4ff",
                      fontWeight: "bold",
                    }}>
                    Chat Bot
                  </div>
                  <div className='message-text'>{message.text}</div>
                  <div className='product-detail'>
                    <ProductDetails
                      brand={message.item.brand}
                      title={message.item.name}
                      salePrice={message.item.discount_price}
                      regularPrice={message.item.regular_price}
                      sizes={["S", "M", "L"]}
                      stock={message.item.stock}
                      images={message.item.images}
                    />
                  </div>
                  <div
                    className='time-stamp'
                    style={{
                      fontSize: ThemeConstants.FONTSIZE_12,
                      textAlign: "right",
                    }}>
                    {message.timeStamp}
                  </div>
                </div>
              </div>
            );
          case MessageType.Bot:
            return (
              <div
                className='bot-message'
                key={index.toString() + "key-nemawe1"}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  margin: "10px",
                  minWidth: "100px",
                  minHeight: "40px",
                  overflow: "hidden",
                }}>
                <img
                  src='https://t4.ftcdn.net/jpg/03/51/61/49/360_F_351614912_nhPej8tYdn8gytfBnBPag8HBUt2vaznE.jpg'
                  alt='user'
                  className='profile-pic left'
                  style={{
                    width: "40px",
                    height: "40px",
                    marginRight: "10px",
                    borderRadius: "50%",
                  }}
                />
                <div
                  className='message-content'
                  style={{
                    backgroundColor: "#e8f6ff",
                    borderRadius: "5px",
                    padding: "10px 10px 10px 20px",
                    display: "inline-block",
                    minWidth: "30%",
                  }}>
                  <div
                    className='sender-name'
                    style={{
                      color: "#37b4ff",
                      fontWeight: "bold",
                    }}>
                    Chat Bot
                  </div>
                  <div className='message-text'>{message.text}</div>
                  <div
                    className='time-stamp'
                    style={{
                      fontSize: ThemeConstants.FONTSIZE_12,
                      textAlign: "right",
                    }}>
                    {message.timeStamp}
                  </div>
                </div>
              </div>
            );
          default:
            // eslint-disable-next-line react/jsx-no-useless-fragment
            return <></>;
        }
      })}
      <div ref={chatLogRef} />
    </div>
  );
};

export default ChatProvider;

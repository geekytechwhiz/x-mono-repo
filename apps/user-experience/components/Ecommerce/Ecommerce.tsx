import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Error from "../error";
import {
  PRODUCT_DETAIL,
  PRODUCT_LIST,
  PRODUCT_CART,
  SHIPPING,
  PAYMENT,
} from "../../constants/CommonConstants";

const ProductListing = dynamic(
  () => import("@platformx/x-prelems-library").then((mod) => mod.ProductListing),
  {
    ssr: false,
  },
);

// const ProductListing: any = dynamic(
//   () => import(`platform-x-prelems/prelems/${ECOMMERCE_PATH}`).then((mod) => mod.ProductDetail),
//   {
//     ssr: false,
//   },
// );
const ProductDetail = dynamic(
  () => import("@platformx/x-prelems-library").then((mod) => mod.ProductListing),
  {
    ssr: false,
  },
);
// const ProductDetail: any = dynamic(
//   () => import(`platform-x-prelems/prelems/${ECOMMERCE_PATH}`).then((mod) => mod.ProductDetail),
//   {
//     ssr: false,
//   },
// );
const Cart: any = dynamic(() => import("@platformx/x-prelems-library").then((mod) => mod.Cart), {
  ssr: false,
});

// const Cart = dynamic(() => import("@platformx/x-prelems-library").then((mod) => mod.Cart), {
//   ssr: false,
// });
const ShippingDetails: any = dynamic(
  () => import("@platformx/x-prelems-library").then((mod) => mod.ShippingDetails),
  {
    ssr: false,
  },
);
// const ShippingDetails: any = dynamic(
//   () => import(`platform-x-prelems/prelems/${ECOMMERCE_PATH}`).then((mod) => mod.ShippingDetails),
//   {
//     ssr: false,
//   },
// );

const PaymentDetail: any = dynamic(
  () => import("@platformx/x-prelems-library").then((mod) => mod.PaymentDetail),
  {
    ssr: false,
  },
);

// const PaymentDetail: any = dynamic(
//   () => import(`platform-x-prelems/prelems/${ECOMMERCE_PATH}`).then((mod) => mod.PaymentDetail),
//   {
//     ssr: false,
//   },
// );

export const Ecommerce = ({
  secondaryArgs = {},
  cartCountUpdate = () => {},
  takeToLoginPage = () => {},
}: any) => {
  const router = useRouter();
  const ecommPage = router?.query?.id || [];
  const loadEcommPageOnRoute = () => {
    switch (ecommPage) {
      case PRODUCT_LIST:
        return (
          <ProductListing
            secondaryArgs={secondaryArgs}
            cartCountUpdate={cartCountUpdate}
            fromPage={undefined}
            attributes={{
              key: "",
              value: [],
            }}
          />
        );
      case PRODUCT_DETAIL:
        return (
          <ProductDetail
            secondaryArgs={secondaryArgs}
            cartCountUpdate={cartCountUpdate}
            fromPage={undefined}
            attributes={{
              key: "",
              value: [],
            }} // productId={router?.query?.productId}
          />
        );
      case PRODUCT_CART:
        return <Cart secondaryArgs={secondaryArgs} cartCountUpdate={cartCountUpdate} />;
      case SHIPPING:
        return <ShippingDetails secondaryArgs={secondaryArgs} cartCountUpdate={cartCountUpdate} />;
      case PAYMENT:
        return (
          <PaymentDetail
            secondaryArgs={secondaryArgs}
            cartCountUpdate={cartCountUpdate}
            takeToLoginPage={takeToLoginPage}
          />
        );
      default:
        return <Error />;
    }
  };

  return <>{loadEcommPageOnRoute()}</>;
};

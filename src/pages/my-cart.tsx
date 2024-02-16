import { useRemoveBasketMutation } from "@/services/basket";
import { RootState } from "@/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const MyCart = () => {
  const [removeBasket, result] = useRemoveBasketMutation();
  // ** Selector **
  const basket: any = useSelector((state: RootState) => state.basketState);

  // ** State **
  const [selected, setSelected] = useState<number[]>([]);

  const handleChangeChecked = (item: any) => {
    const select = selected;
    select.push(item.productId);
    setSelected(() => select);
    console.log(selected, item);
    console.log(
      selected.find((k: number) => k === parseInt(item.productId))
        ? true
        : false
    );
  };

  const handleChangeAllChecked = () => {
    basket.basket.map((item: any, index: number) => {
      selected.push(item.productId);
      setSelected(selected);
    });
  };

  const handleClickMovementDelete = (item: any) => {
    removeBasket({ movements: [item.id] }) // [11,12,13]
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleChangeAllChecked()}
                    className="checkbox"
                  />
                </label>
              </th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {basket.basket.map((item: any, index: number) => {
              return (
                <>
                  <tr>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          onChange={() => handleChangeChecked(item)}
                          className="checkbox"
                        />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src="/tailwind-css-component-profile-2@56w.png"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.product.title}</div>
                        </div>
                      </div>
                    </td>
                    <td>{item.discountPrice}</td>
                    <td>{item.quantity}</td>
                    <th>{item.total}</th>
                    <td>
                      <button onClick={() => handleClickMovementDelete(item)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyCart;

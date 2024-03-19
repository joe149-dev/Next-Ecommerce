import {
  useSetOrderEventMutation,
  useGetUsersOrdersMutation,
} from "@/services/movement";
import React, { useEffect, useState } from "react";
import moment from "moment";

const option = [
  "Seçiniz",
  "Sipariş Hazırlandı",
  "Paketlendi",
  "Kargo",
  "Teslim Edildi",
];

const UsersOrders = () => {
  const [getUserOrders, result] = useGetUsersOrdersMutation();
  const [setOrderEvent, resultOrderEvent] = useSetOrderEventMutation();

  const [selectedEvent, setSelectedEvent] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getUserOrders("");
  }, []);

  const handleOrderEvent = (movementId: number) => {
    setOrderEvent({ movementId, event: selectedEvent });
  };

  return (
    <div>
      {result.isSuccess && (
        <>
          {result.data.list
            .filter((k: any) => k.movementId === null)
            .sort((a: any, b: any) => (b?.id >= a?.id ? 1 : -1))
            .map((item: any, index: number) => {
              return (
                <div className="p-5" key={index}>
                  <div className="card w-full bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title justify-between">
                        <span>
                          Sipariş ({item.id}){" "}
                          <span className="text-sm">({item.user.name})</span>
                        </span>
                        <span>
                          {moment(item.updatedAt).format("DD.MM.YYYY")}{" "}
                          <span className="text-sm">
                            {moment(item.updatedAt).format("HH:mm")}
                          </span>
                        </span>
                        <span>{item.description.split("|")[0]}</span>
                        <button className="btn">
                          Tutar
                          <div className="badge badge-secondary">
                            {item.total}
                          </div>
                        </button>
                      </h2>
                      {result.data.list
                        .filter((k: any) => k.movementId === item.id)
                        .map((v: any, i: number) => {
                          return (
                            <div
                              key={i}
                              className="inline-flex justify-between"
                            >
                              <span>{v.product.title}</span>
                              <span>
                                ({v.quantity}) {v.total}
                              </span>
                            </div>
                          );
                        })}
                      <div>
                        <div className="inline-flex">
                          <select
                            onChange={(e: any) =>
                              setSelectedEvent(e.target.value)
                            }
                            className="items-end rounded border appearance-none text-white border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
                          >
                            {/* Ödeme işlemi yapıldı 70 indirim yapıldı|Sipariş Hazırlandı|Paketlendi */}
                            {option.map((t: string, i: number) => {
                              const desSplit = item.description.split("|")
                              if(desSplit[desSplit.length-1] === option[i]){
                                return (<option selected key={i}>{t}</option>)
                              } else {
                                return (<option key={i}>{t}</option>)
                              }
                            })}
                          </select>
                          <button
                            className="ml-1"
                            onClick={() => handleOrderEvent(item.id)}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default UsersOrders;

import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const Result = () => {
  const [sessionYear, setSessionYear] = useState("2022/2023");
  const [userData, setUserData] = useState([]);
  const [visible, setVisible] = useState("true");
  const [visibleResult, setVisibleResult] = useState("");

  const handleVisibleChange = () => {
    setVisible(!visible);
    setVisibleResult("Can't display result until semester end.");
  };

  const handleInvisibleChange = () => {
    setVisible(!visible);
    setVisibleResult("");
  };

  const onChange = (e) => {
    const value = e.target.value;
    setSessionYear(value);
  };
  const url = "http://localhost:9090/user";
  useEffect(() => {
    fetch(url, {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
        if (data.data == "Token expired") {
          swal({
            icon: "warning",
            title: "Timeout",
            text: "Session expired, login again",
          });
          window.localStorage.clear();
          window.location.href = "/login";
        }
      });
  }, []);
  return (
    <div>
      <div className="w-full flex px-10 py-5 md:py-10">
        <input
          placeholder="Search"
          type="text"
          className="w-5/6 py-3 border border-black px-5"
        />
        <button className="text-white bg-black w-1/6">
          <SearchIcon />
        </button>
      </div>

      <div className="px-3">
        <div className="text-center bg-zinc-300 py-10 px-2">
          <h1 className="font-black text-blue-900 text-lg md:text-2xl">
            No results have been released so far
          </h1>
          <div>
            <h1 className="font-black text-xl md:text-2xl">C.G.P.A</h1>

            {visible ? (
              <span onClick={handleVisibleChange}>
                <VisibilityIcon />
              </span>
            ) : (
              <span onClick={handleInvisibleChange}>
                <VisibilityOffIcon />
              </span>
            )}

            <h1 className="italic text-blue-900 font-black">{visibleResult}</h1>
          </div>
        </div>
      </div>

      <div className="flex py-10 justify-between items-center px-10">
        <h1 className="font-black text-xl md:text-2xl uppercase">Session:</h1>

        <select
          defaultValue="2022/2023"
          className="border-gray-500 border-2 w-2/6"
          onChange={onChange}
        >
          <option defaultValue=" 2022/2023" disabled>
            2022/2023
          </option>
          <option value="2021/2022">2021/2022</option>
          <option value="2020/2021">2020/2021</option>
          <option value="2019/2020">2019/2020</option>
          <option value="2018/2019">2018/2019</option>
          <option value="2017/2018">2017/2018</option>
          <option value="2016/2017">2016/2017</option>
          <option value="2015/2016">2015/2016</option>
          <option value="2014/2015">2014/2015</option>
          <option value="2013/2014">2013/2014</option>
          <option value="2012/2013">2012/2013</option>
          <option value="2011/2012">2011/2012</option>
          <option value="2010/2011">2010/2011</option>
          <option value="2009/2010">2009/2010</option>
          <option value="2008/2009">2008/2009</option>
          <option value="2007/2008">2007/2008</option>
          <option value="2006/2007">2006/2007</option>
          <option value="2005/2006">2005/2006</option>
          <option value="2004/2005">2004/2005</option>
          <option value="2003/2004">2003/2004</option>
          <option value="2002/2003">2002/2003</option>
          <option value="2001/2002">2001/2002</option>
          <option value="2000/2001">200/2001</option>
        </select>
      </div>

      <div className="text-center">
        <h1 className="font-black text-xl md:text-3xl">{sessionYear}</h1>
        <p className="text-red-600 italic font-black md:text-2xl">
          No results to display.
        </p>
      </div>
    </div>
  );
};

export default Result;

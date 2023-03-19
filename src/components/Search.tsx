import React, { useState } from "react";

interface SearchOrderProps {}

const SearchOrder: React.FC<SearchOrderProps> = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filterPanelOpen, setFilterPanelOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<{
    itemNumber: string;
    orderNumber: string;
    type: string[];
  }>({
    itemNumber: "",
    orderNumber: "",
    type: [],
  });
  const [searchResult, setSearchResult] = useState<any[]>([]); 

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleItemNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      itemNumber: e.target.value,
    }));
  };

  const handleOrderNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      orderNumber: e.target.value,
    }));
  };

  const handleTypeCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFilters((prevFilters) => {
      const types = prevFilters.type;
      if (checked) {
        types.push(value);
      } else {
        const index = types.indexOf(value);
        if (index > -1) {
          types.splice(index, 1);
        }
      }
      return {
        ...prevFilters,
        type: types,
      };
    });
  };

  const handleSearchClick = async () => {
    //  implementing search logic

        const dummyData = [  { orderNumber: 1, itemNumber: "A", type: "EDF" },  { orderNumber: 2, itemNumber: "B", type: "CAO" },  { orderNumber: 3, itemNumber: "D", type: "SFO" },];

        const filterData = (data: any[], filters: { itemNumber: string; orderNumber: string; type: string[] }) => {
        let filteredData = data;

        if (filters.itemNumber) {
            const itemNumbers = filters.itemNumber.split(",").map((n) => n.trim());
            filteredData = filteredData.filter((d) => itemNumbers.map((n) => n.toLocaleUpperCase()).includes(d.itemNumber.toLocaleUpperCase()));
        }

        if (filters.orderNumber) {
            const orderNumbers = filters.orderNumber.split(",").map((n) => parseInt(n.trim(), 10));
            filteredData = filteredData.filter((d) => orderNumbers.includes(d.orderNumber));
        }

        if (filters.type.length > 0) {
            filteredData = filteredData.filter((d) => filters.type.includes(d.type));
        }

        return filteredData;
        };

        const search = async (text: string, filters: { itemNumber: string; orderNumber: string; type: string[] }) => {
        // Mimic API call
        const data = await new Promise<any[]>((resolve) => {
            setTimeout(() => {
            resolve(dummyData);
            }, 1000);
        });

        const filteredData = filterData(data, filters);

        if (!text) {
            return filteredData;
        }

        const itemNumbers = text.split(",").map((n) => n.trim());
        return filteredData.filter((d) => itemNumbers.map((n) => n.toLocaleUpperCase()).includes(d.itemNumber.toLocaleUpperCase()));
        };
        const result = await search(searchText, filters);
        setSearchResult(result);


  };

  const handleResetClick = () => {
    setSearchText("");
    setFilters({
      itemNumber: "",
      orderNumber: "",
      type: [],
    });
    setSearchResult([]);
  };

  const handleFilterButtonClick = () => {
    setFilterPanelOpen((prevOpen) => !prevOpen);
  };

  return (
    <div>
      <div>
        <input type="text" value={searchText} onChange={handleSearchInputChange} />
        <button onClick={handleSearchClick}>Search</button>
        <button onClick={handleResetClick}>Reset All</button>
        <button onClick={handleFilterButtonClick}>Filter</button>
      </div>
      {filterPanelOpen && (
        <div>
          <div>
            <label>Item Number:</label>
            <input type="text" value={filters.itemNumber} onChange={handleItemNumberInputChange} />
          </div>
          <div>
            <label>Order Number:</label>
            <input type="text" value={filters.orderNumber} onChange={handleOrderNumberInputChange} />
          </div>
          <div>
            <label>Type:</label>
            <div>
              <label>
                <input type="checkbox" value="EDF" checked={filters.type.includes("EDF")} onChange={handleTypeCheckboxChange} />
                EDF
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="CAO" checked={filters.type.includes("CAO")} onChange={handleTypeCheckboxChange} />
            CAO
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" value="SFO" checked={filters.type.includes("SFO")} onChange={handleTypeCheckboxChange} />
            SFO
          </label>
        </div>
      </div>
    </div>
  )}
  <table>
    <thead>
      <tr>
        <th>Order Number</th>
        <th>Item Number</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      {searchResult.map((result) => (
        <tr key={result.orderNumber}>
          <td>{result.orderNumber}</td>
          <td>{result.itemNumber}</td>
          <td>{result.type}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
);
};

export default SearchOrder;

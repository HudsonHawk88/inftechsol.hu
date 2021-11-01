import React, { useEffect, useState, useCallback } from "react";
import { Table, Input } from "reactstrap";

const BootstrapTable = ({ columns, data }) => {
  const [tableData,setTableData] = useState(data);
  const [filteredData,setFilteredData] = useState(data);


  const [filters, setFilters] = useState({});

  const setDefaultFilters = () => {
    const table = document.getElementsByTagName("thead");
    let filts = {};
    Array.from(table).forEach((item) => {
      let inputs = item.getElementsByTagName("input");
      let selects = item.getElementsByTagName("select");

      Array.from(inputs).forEach((input) => {
        filts = { ...filts, [input.name]: "" };
      });
      Array.from(selects).forEach((select) => {
        filts = { ...filts, [select.name]: "" };
      });
    });
    if (tableData.length === 0) {
        setFilters(filts);
    }
  };

  useEffect(() => {
    setDefaultFilters();
    setTableData(data);
    setFilteredData(data);
  }, [data]);

  const filterData = (name) => {
    const filterValues = Object.values(filters);
    console.log(filterValues)
    const filterVal = filterValues.map((filterValue) => {
        console.log(filterValue)
        return filterValue;
    })
    let result = "";
    if (value === "") {
        result = tableData.filter((data) => data);
    } else {
        result = tableData.filter((data) => {
            console.log(data)
            return data[name].search(filterVal) != -1;
        });
    }
    
    setFilteredData(result);
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFilters({
        ...filters,
        [name]: value
    })
    filterData(name, value);
  }

  function textFilter(col, filterValue, index) {
    return (
      <th key={index.toString()}>
        {col.title}&nbsp;&nbsp;
        <Input
          type="text"
          name={col.dataField}
          placeholder={col.placeholder ? col.placeholder : "Keresés..."}
          onChange={handleInputChange}
          value={filterValue ? filterValue : ""}
        />
      </th>
    );
  }

  function selectFilter(col, filterValue, index) {
    const renderFilterOptions = () => {
      const filterOptions = data.filter((item) => {
        return item[col.dataField];
      });
      return filterOptions.map((filter, idx) => {
        return (
          <option
            key={col.dataField + idx.toString()}
            value={filter[col.dataField]}
          >
            {filter[col.dataField]}
          </option>
        );
      });
    };
    return (
      <th key={index.toString()}>
        {col.title}&nbsp;&nbsp;
        <Input
          type="select"
          name={col.dataField}
          placeholder={col.placeholder ? col.placeholder : "Keresés..."}
          onChange={handleInputChange}
          value={filterValue ? filterValue : ""}
        >
          <option key="" value="">
            Összes
          </option>
          {renderFilterOptions()}
        </Input>
      </th>
    );
  }

  const renderColumns = (col, index) => {
    if (col.filter) {
      switch (col.filter) {
        case "textFilter": {
          return textFilter(col, filters[col.dataField], index);
        }
        case "selectFilter": {
          return selectFilter(col, filters[col.dataField], index);
        }
        default: {
          return textFilter(col, data, index);
        }
      }
    } else {
      return <th key={index.toString()}>{col.title}</th>;
    }
  };

  const renderRows = (row, index) => {
    const cell = columns.map((col, idx) => {
      return <td key={idx}>{row[col.dataField]}</td>;
    });

    return <tr key={index}>{cell}</tr>;
  };

  return (
    <Table>
      <thead>
        <tr>{columns.map(renderColumns)}</tr>
      </thead>
      <tbody>{filteredData.map(renderRows)}</tbody>
    </Table>
  );
};

export { BootstrapTable };

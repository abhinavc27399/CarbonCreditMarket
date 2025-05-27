import React, { useState, useEffect, useRef } from "react";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { CrabonCreditCertificate } from "../types/CarbonCreditCertificate";
import { Suggestion } from "../types/Suggestion";
import { CallApi } from "../api/callApi";
import { ApiEndpoint } from "../api/apiEndpoint";
import { ApiMethod } from "../api/apiMethod";
import { useSnackbar } from "../contexts/SnackbarContex";


/**
 * Combination of an Autocomplete component and a Table component to explore carbon credit certificates
 * @returns An Autocomplete for search functionality, and a Table to dispay the results for the selected suggested option in the Autocomplete
 */
const ExploreCarbonCredits: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); //------------------- |
  const delay = 500; //                                                             |
  const searchAbortControllerRef = useRef<AbortController | null>(null); //         | For debounced search for Carbon Credit Certificates' suggestions in autocomplete
  const latestRequestIdRef = useRef<number>(0); //                                  |
  const latestSearchRef = useRef<string>(""); //------------------------------------|
  const { showSnackbar } = useSnackbar();
  const [options, setOptions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Suggestion | null>(null);
  const [tableData, setTableData] = useState<CrabonCreditCertificate[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // API for autocomplete suggestions---------------------------------------------------------------------------------
  const fetchSuggestions = async (search: string) => {
    setLoading(true);
    latestSearchRef.current = searchQuery;
    latestRequestIdRef.current++;
    const requestId = latestRequestIdRef.current;
    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort();
    }
    const controller = new AbortController();
    searchAbortControllerRef.current = controller;
    CallApi({
      apiEndpoint: ApiEndpoint.FetchCertificateSuggestion,
      method: ApiMethod.POST,
      data: {'search_text': search},
      signal: controller.signal,
    })
      .then((response) => {
        if (
          response?.length &&
          requestId === latestRequestIdRef.current &&
          searchQuery === latestSearchRef.current
        ) {
          setOptions(response);
        } else {
          setOptions([]);          
          showSnackbar("No Options", 'info');
        }
        setLoading(false)
      })
      .catch(() => {
        showSnackbar("Could not fetch suggestions", "error");
        setLoading(false)
      });
  };

  // Debounce logic with useEffect on seacrh query----------------------------------------------------------------------
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    const debounceTimer = setTimeout(() => {
      if (searchQuery) {
        fetchSuggestions(searchQuery);
      } else {
        setOptions([]);
      }
    }, delay);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSelect = (option: Suggestion | null) => {
    setSelectedOption(option);
    if (option) {
      fetchDetails(option.name);
    } else {
      setTableData([]);
    }
  };

  //API for table data----------------------------------------------------------------------------------------------------
  const fetchDetails = (optionName: string) => {
    CallApi({
      apiEndpoint: ApiEndpoint.FetchCertificates,
      method: ApiMethod.POST,
      data: { option: optionName },
    })
      .then((response) => {
        response?.length ?? setTableData(response);
      })
      .catch(() => {
        showSnackbar("Could not fetch suggestions", "error");
      });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Autocomplete
        loading={loading}
        options={options}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        onInputChange={(_, value) => setSearchQuery(value)}
        onChange={(_, value) => handleSelect(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              },
            }}
          />
        )}
      />

      {selectedOption && (
        <Typography variant="h6" sx={{ mt: 3 }}>
          Results for: <strong>{selectedOption.name}</strong>
        </Typography>
      )}

      {tableData.length > 0 && (
        <Paper sx={{ marginTop: 2, padding: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Certificate Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Carbon Reduction</TableCell>
                <TableCell>Vintage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.certificate_id}>
                  <TableCell>{row.certificate_id}</TableCell>
                  <TableCell>{row.project_title}</TableCell>
                  <TableCell>{row.project_description}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.carbon_reduction_amount}</TableCell>
                  <TableCell>
                    {row.vintage.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default ExploreCarbonCredits;

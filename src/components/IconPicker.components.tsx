import React, { useState, useMemo } from "react";
import * as MuiIcons from "@mui/icons-material";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
  Button,
} from "@mui/material";

// A type union of allowed variants.
const VARIANTS = ["Filled", "Outlined", "Rounded", "TwoTone", "Sharp"] as const;
type Variant = (typeof VARIANTS)[number];

// The default Material UI icons are React components that accept SVG props.
type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface IconPickerProps {
  onSelect: (iconName: string) => void;
}

function IconPicker({ onSelect }: IconPickerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [variant, setVariant] = useState<Variant>("Filled");

  // This is our "batch size" – how many icons to show at once
  const BATCH_SIZE = 100;
  
  // Track how many icons we’re currently showing
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  // Convert the wildcard import object into an array
  const allIcons = useMemo(() => {
    return Object.entries(MuiIcons).map(([name, Component]) => ({
      name,
      Component: Component as IconComponent,
    }));
  }, []);

  // Filter icons by variant + search
  const filteredIcons = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return allIcons.filter(({ name }) => {
      const nameLower = name.toLowerCase();
      const matchesVariant =
        variant === "Filled"
          ? !(
              name.endsWith("Outlined") ||
              name.endsWith("Rounded") ||
              name.endsWith("TwoTone") ||
              name.endsWith("Sharp")
            )
          : name.endsWith(variant);
      const matchesSearch = nameLower.includes(searchLower);
      return matchesVariant && matchesSearch;
    });
  }, [allIcons, searchTerm, variant]);

  // Show only the first `visibleCount` icons from the filtered list
  const displayedIcons = filteredIcons.slice(0, visibleCount);

  // Update variant when user selects from dropdown
  const handleVariantChange = (e: SelectChangeEvent) => {
    setVariant(e.target.value as Variant);
    // Reset visible count when variant changes
    setVisibleCount(BATCH_SIZE);
  };

  // Handle "Load More" button to show the next batch
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + BATCH_SIZE);
  };

  return (
    <Box>
      {/* -- Search & Variant Controls -- */}
      <Box 
        sx={{ 
          display: "flex", 
          gap: 2, 
          padding: 2, 
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          }}
        >
        <TextField
          label="Search icons"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(BATCH_SIZE); // reset visible count on new search
          }}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "5px",
            
          }}
        />
        <Select
          value={variant}
          size="small"
          onChange={handleVariantChange}
          sx={{
            color: "white",
            backgroundColor: "rgba(64, 102, 151, 0.38)",
          }}
        >
          {VARIANTS.map((v) => (
            <MenuItem key={v} value={v}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* -- Display Filtered Icons (limited to visibleCount) -- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
          maxHeight: 300,
          overflowY: "auto",
          // border: "0px solid rgba(109, 127, 142, 0.3)",
          p: 1,
          bgcolor: "rgba(0, 0, 0, 0.35)",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.74)",
          borderRadius: "0px 0px 5px 5px",
        }}
      >
        {displayedIcons.map(({ name, Component }) => (
          <Box
            key={name}
            sx={{
              width: "20%",
              padding: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              border: "2px solid transparent",
              "&:hover": {
                borderColor: "rgba(0, 0, 0, 0.2)"
              },
              "&:active": {
                backgroundColor: "rgba(0, 0, 0, 0.47)",
              },
              backgroundColor: "rgba(0, 0, 0, 0.38)",
              borderRadius: 2,
              color: "white",
              boxShadow: "0 8px 2px rgba(0, 0, 0, 0.57)",
            }}
            onClick={() => onSelect(name)}
          >
            <Component />
            <Typography
              noWrap
              width="100%"
              overflow="hidden"
              textAlign="center"
              fontSize="0.7rem"
            >
              {name}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* -- Load More Button -- */}
      {filteredIcons.length > visibleCount && (
        <Box sx={{ textAlign: "center", padding: 1 }}>
          <Button 
            variant="contained" 
            onClick={handleLoadMore}
            sx={{ 
              backgroundColor: "rgba(255, 115, 0, 0.42)",
              color: "black",
              fontFamily: "monospace",
              fontSize: "1rem",
            }}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default IconPicker;
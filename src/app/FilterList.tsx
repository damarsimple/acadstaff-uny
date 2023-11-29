"use client"
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Divider, Paper, Typography } from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import client from '@/Client';
import useFilterStore from '@/stores/filter';
import { faculties } from '@/type';




export default function CheckboxList() {

    const {
        selected,
        setSelected
    } = useFilterStore();
 

    const handleToggle = (value: number) => () => {
        const currentIndex = selected.indexOf(value);
        const newChecked = [...selected];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setSelected(newChecked);

    };

    return (
        <Paper>

            <Typography
                variant='h6'
                sx={{
                    p: 2,
                    fontWeight: "bold",
                }}>
                Faculty Filter
            </Typography>

            <Divider />
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {faculties?.map((faculty) => {
                    const labelId = `checkbox-list-label-${faculty.id}` as string;

                    return (
                        <ListItem
                            key={faculty.id}
                        
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(Number(faculty.id))} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={selected.indexOf(Number(faculty.id)) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={faculty.name} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
}

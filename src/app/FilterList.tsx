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




export default function CheckboxList() {

    const [faculties, setFaculties] = React.useState<{id: string, name:string}[]>([])
    const {
        selected,
        setSelected
    } = useFilterStore();
    React.useEffect(()=>{
        client.query({
            query: gql`query FindManyFaculty {
                findManyFaculty {
                  id
                  name
                }
              }`
        }).then(({data}) => setFaculties(data.findManyFaculty))
    },[])

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
                Filter
            </Typography>

            <Divider />
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {faculties?.map((faculty) => {
                    const labelId = `checkbox-list-label-${faculty.id}` as string;

                    return (
                        <ListItem
                            key={faculty.id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                    <CommentIcon />
                                </IconButton>
                            }
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

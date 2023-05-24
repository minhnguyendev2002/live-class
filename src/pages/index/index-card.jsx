import React from 'react'
import {makeStyles } from '@material-ui/core/styles'
import {useGlobalMutation} from '../../utils/container'
import FormControl from '@material-ui/core/FormControl'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import useRouter from '../../utils/use-router'
import {Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    fontStyle: {
        color: '#9ee2ff'
    },
    midItem: {
        marginTop: '1rem',
        marginBottom: '6rem'
    },
    item: {
        flex: 1,
        display: 'flex',
        alignItems: 'center'
    },
    coverLeft: {
        background: 'linear-gradient(to bottom, #307AFF, 50%, #46cdff)',
        alignItems: 'center',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    coverContent: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#fff'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        display: 'flex',
        minWidth: 700,
        minHeight: 500,
        maxHeight: 500,
        borderRadius: '10px',
        boxShadow: '0px 6px 18px 0px rgba(0,0,0,0.2)'
    },
    input: {
        maxWidth: '250px',
        minWidth: '250px',
        alignSelf: 'center'
    },
    grid: {
        margin: '0 !important'
    },
    button: {
        lineHeight: '21px',
        color: 'rgba(255,255,255,1)',
        fontSize: '17px',
        textTransform: 'none',
        height: '44px',
        width: '260px',
        '&:hover': {
            backgroundColor: '#82C2FF'
        },
        margin: theme.spacing(1),
        marginTop: '33px',
        backgroundColor: '#44a2fc',
        borderRadius: '30px'
    },
    radio: {
        padding: '0',
        fontSize: '14px',
        // display: 'flex',
        alignItems: 'center',
        paddingRight: '5px'
    }
}))

export default function IndexCard() {
    const classes = useStyles()

    const routerCtx = useRouter()
    const mutationCtx = useGlobalMutation()

    const handleClick = () => {
        mutationCtx.startLoading()
        routerCtx.history.push({
            pathname: `/meeting/wealmanagement`
        })
    }

    return (
        <Box
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            flexDirection="column"
        >
            <Link to="/setting" className="setting-btn"/>
            
            <span className="version">
                Wealth Management
            </span>
            <div className="role-container">
            </div>
            <Box
                marginTop="92"
                flex="1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
                <FormControl className={classes.grid}>
                    <Button
                        onClick={handleClick}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        {window.location.href.includes('/host') ? 'Start' : 'Join'} Live Streaming
                    </Button>
                </FormControl>
            </Box>
        </Box>
    )
}

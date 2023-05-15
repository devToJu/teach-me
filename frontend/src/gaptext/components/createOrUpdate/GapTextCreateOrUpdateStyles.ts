export const boxStyleBorder = {
    display: 'flex',
    flexWrap: 'wrap',
    mb: 5,
    mt: 5,
    border: 1,
    borderRadius: 1,
    borderColor: "grey.400",
    '& > :not(style)': {
        width: "90%",
    }
}

export const formStyle = {
    paddingBottom: 25,
    paddingLeft: 25,
    paddingRight: 25,
}

export const formStyleOpacity = {
    ...formStyle,
    opacity: 0.5
}

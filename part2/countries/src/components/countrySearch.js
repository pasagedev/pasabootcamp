export const CountrySearch = ({ inputValue, handleInput }) => (
    <div>
        find countries: <input onChange={handleInput} value={inputValue} />
    </div>
)

import ProductsList from "../components/ProductsList"


const TaggedProducts = ({ tags }) => {
    return (
        <div>
            <div class="flex flex-col py-0">
                <div class="h-1 bg-gray-200 rounded overflow-hidden ">
                    <div class="w-24 h-full bg-indigo-500"></div>
                </div>
                <div class="flex flex-wrap sm:flex-row flex-col mb-12">
                    <h1 class="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">{tags.name}</h1>
                    <p class="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">Street art subway tile salvia four dollar toast bitters selfies quinoa yuccie synth meditation iPhone intelligentsia prism tofu. Viral gochujang bitters dreamcatcher.</p>
                </div>
            </div>

            <ProductsList products={tags.products} />
        </div>
    )
}

export default TaggedProducts


import { Rapper } from './../models/rapperModel.ts';
import { v4 } from "https://deno.land/std/uuid/mod.ts"

let rappers: Rapper[] = [
    {
        id: "1",
        aka: "Toto",
        mainStyle: "Trap soul",
    },
    {
        id: "1",
        aka: "Pause",
        mainStyle: "Deep rap",
    }
];

//  @desc   Get all rappers
//  @route  GET /rappers

export const getRappers = ({response}:{response:any}) => {
    response.body={
        success:true,
        data:rappers
    }
}

//  @desc   Get single rapper
//  @route  GET /rappers/:id

export const getRapper = ({response,params}:{response:any, params: {id:string} }) => {
    const rapper: Rapper | undefined =rappers.find( r => r.id===params.id )
    if(rapper){
        response.status=200
        response.body={
            success:true,
            data: rapper
        }
    } else {
        response.status=404
        response.body={
            success:false,
            message:"Rapper not found"
        }
    }
}

//  @desc   Add new rapper
//  @route  POST /rappers

export const addRapper = async ({response, request }:{response:any, request:any }) => {
    const body = await request.body()
    if(!request.hasBody){
        response.status=400
        response.body = {
            success:false,
            message:"no data"
        }
    } else {
        const newRapper : Rapper = body.value
        newRapper.id=v4.generate()
        rappers=[...rappers,newRapper]
        response.status=201
        response.body={
            success:true,
            data: newRapper
        }
    }
}

//  @desc   update a rapper
//  @route  PUT /rappers/:id

export const updateRapper = async ({response, request, params }:{response:any, request:any, params:{id:string} }) => {

    const rapper: Rapper | undefined =rappers.find( p => p.id === params.id )
    if(rapper){
        const body = await request.body()
        if(!request.hasBody){
            response.status=400
            response.body={
                success:false,
                message:"no data"
            }
        } else {
            const updatedRapper : { aka?:string, mainStyle?:string} = await body.value
            rappers.map( r => r.id === params.id ? {...r,...updatedRapper} : r )
            response.status=200
            response.body={
                success:true,
                data: rappers
            }
        }
    } else {
        response.status=404
        response.body={
            success:false,
            message:"Rapper not found"
        }
    }
}

//  @desc   Delete a rapper
//  @route  DELETE /rappers/:id

export const deleteRapper = ({response,params}:{response:any, params: {id:string} }) => {
    const rapper: Rapper | undefined =rappers.find( r => r.id === params.id )
    if(rapper){
        response.status=200
        rappers=rappers.filter( r => r.id !== params.id )
        response.body={
            success:true,
            message: "Rapper removed"
        }
    } else {
        response.status=404
        response.body={
            success:false,
            message:"Rapper not found"
        }
    }
}
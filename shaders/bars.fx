cbuffer ConstantBuffer : register(b0)
{
	float Time;
	float4x4 World;
	float4x4 View;
	float4x4 Projection;
	float4x4 WorldViewProjection;
	float Alpha;
	float3 Blend;
	float4x4 InvWorld;
}

cbuffer Uniforms : register(b1)
{

}

struct VOut
{
	float4 position : SV_POSITION;
	float4 colour : COLOUR;
	float3 normal : NORMAL;
	float2 texcoord : TEXCOORD0;
};

VOut VS(float4 position : POSITION, float3 normal : NORMAL, float2 texcoord : TEXCOORD0, float4 colour : COLOUR)
{
	VOut output;
	output.position = mul(position, WorldViewProjection);
	output.normal = normalize(mul(float4(normal, 0), InvWorld).xyz);
	output.texcoord = texcoord;
	output.colour = colour;
	return output;
}

Texture2D textures[2];
SamplerState SampleType;

float4 PS(VOut input) : SV_TARGET
{
	input.texcoord.y += sin(input.texcoord.x*10+Time*4)/2*(0.05+abs(sin(Time*2))/100);

	float doClip = input.texcoord.y;

	clip(doClip - 0.1);

	float4 textureColour = textures[0].Sample(SampleType, input.texcoord);
	float4 colour = float4(textureColour.rgb * Blend * input.colour.rgb, textureColour.a);
	colour.a *= Alpha;

	colour.a = lerp(0, 1, input.texcoord.y*2);

	return colour;
}
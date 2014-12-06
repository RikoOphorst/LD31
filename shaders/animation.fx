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
	float4 AnimationMetrics;
	float Hit;
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
	float x = (input.texcoord.x * AnimationMetrics.z) + AnimationMetrics.x;
	float y = (input.texcoord.y * AnimationMetrics.w) + AnimationMetrics.y;
	float4 textureColour = textures[0].Sample(SampleType, float2(x,y));
	float4 colour = float4(textureColour.rgb * Blend * input.colour.rgb, textureColour.a);
	colour.a *= Alpha;

	if (Hit == 1.0f)
	{
		return float4(1.0f,1.0f,1.0f,colour.a);
	}

	return colour;
}
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('company_profiles', function (Blueprint $table) {
            $table->id();

            $table->string('company_name');
            $table->string('logo')->nullable();

            $table->string('email')->nullable();
            $table->string('phone', 30)->nullable();

            $table->text('address')->nullable();

            $table->unsignedBigInteger('country_id')->nullable();
            $table->unsignedBigInteger('state_id')->nullable();
            $table->unsignedBigInteger('city_id')->nullable();

            $table->string('zipcode', 20)->nullable();

            $table->string('gst_number', 50)->nullable();
            $table->string('pan_number', 20)->nullable();

            $table->string('website')->nullable();

            $table->timestamps();

            $table->index('country_id');
            $table->index('state_id');
            $table->index('city_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('company_profiles');
    }
};
